// global variables
let posts = [];
let editPostId = null;

//DOM element selection
const form = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const postsContainer = document.getElementById("postContainer");

//load posts from local storage
function loadPosts() {
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
        posts = JSON.parse(storedPosts);
    }
    renderPosts();
}
function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}
function renderPosts() {
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button onClick="editPost(${post.id})">Edit</button>
        <button onClick="deletePost(${post.id})">Delete</button>
        `;
        postsContainer.appendChild(div);
    });
}

//handle new post for submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let title = titleInput.value.trim();
    let content = contentInput.value.trim();
    let isValid = true;

    titleError.textContent = "";
    contentError.textContent = "";

    if (title === "") {
        titleError.textContent = "Title is Required.";
        isValid = false;
    }
    if (content === "") {
        contentError.textContent = "Content is Required.";
        isValid = false;
    }
    if (!isValid) return;

    if (editPostId !== null) {
        posts = posts.map(p => {
            if (p.id === editPostId) {
                return { ...p, title, content };
            }
            return p;
        });
        editPostId = null;
    } else {
        const newPost = {
            id: Date.now(),
            title: title,
            content: content
        };
        posts.push(newPost);
    }
    savePosts();
    renderPosts();
    form.reset();
});

//handle delete post
function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    savePosts();
    renderPosts();
}

//handle edit post
function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        titleInput.value = post.title;
        contentInput.value = post.content;
        editPostId = id;
        window.scrollTo(0, 0);
    }
}

loadPosts();

