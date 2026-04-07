// global variables
let posts = [];
let editPostId = null;

//DOM element selection
const form = DocumentFragment.getElementById("postForm");
const titleInput = DocumentFragment.getElementById("title");
const contentInput = DocumentFragment.getElementById("content");
const titleError = DocumentFragment.getElementById("titleError");
const contentError = DocumentFragment.getElementById("contentError");
const postsContainer = DocumentFragment.getElementById("postContainer");

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
form .addEventLiostener("submit", function(event) {
    event.preventDefault();

    if (title === "") {
        titleError.textContent = "Title is Required.";
        isValid = false;
    }
    if (content === "") {
        contentError.textContent = "Content is Required.";
        isValid = false;
    }
    if (!isValid) return;

    titleError.textContent = "";
    contentError.textContent = "";

    let title = titleInput.value.trim();
    let content = contentInput.value.trim();
    let isValid = true;

    if (editPostId !== null) {
        post = post.map(post => {
            if (post.id === editPostId) {
                return { ...post, title, content };
            }
            return post;
        });
        editPostId = null;
    } else {
        const newPost = {
            id:Date.now(),
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
    post = posts.filter(post => post.id !== id);
    savePosts();
    renderPosts();
}

//handle edit post
function editPost(id) {
    const post = posts.find(p => p.id === id);
    titleInput.value = post.title;
    contentInput.value = post.content;
    editPostId = id;
}

loadPosts();


