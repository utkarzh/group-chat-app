logout_btn = document.getElementById("logout-btn");
newgroup_btn = document.getElementById(" newgroup-btn");
const userGroups = document.getElementById("userGroups");
const form = document.getElementById("myform");
const token = localStorage.getItem("token");

// Set default authorization header for every request
axios.defaults.headers.common["Authorization"] = token;

document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get("http://localhost:3000/user/groups");
  console.log(data);
  for (let i = data.length - 1; i >= 0; i--) {
    const group = document.createElement("div");
    group.innerHTML = `<h4><a href="../chat/chat.html" class='entries' id='${data[i].groupId}'>#${data[i].groupName}</a></h4><hr>`;
    if (data[i].isAdmin) {
      group.innerHTML = `<h4><a href="../chat/chat.html" class="entries" id='${data[i].groupId}'>#${data[i].groupName}</a></h4><span class="badge text-bg-success">admin</span><hr>`;
    }
    userGroups.appendChild(group);
  }
});

form.addEventListener("click", (e) => {
  if (e.target.classList.contains("entries")) {
    localStorage.setItem("groupId", e.target.id);
  }
});

logout_btn.addEventListener("click", (e) => {
  localStorage.removeItem("token");
  window.location.href = "../login/login.html";
});
const names = [
  "Hello..",
  "नमस्ते..",
  "سلام",
  "你好",
  "Привет",
  "Hola..",
  "Bonjour..",
  "Ciao..",
  "안녕하세요",
  "こんにちは",
  "Hallo",
  "Olá",
  "Merhaba !",
];

const nameElement = document.querySelector("#hello");
let currentNameIndex = 0;
let intervalDuration = 20; // Start with fast interval

function changeName() {
  nameElement.textContent = names[currentNameIndex];
  currentNameIndex = (currentNameIndex + 1) % names.length;
}

let changeNameInterval = setInterval(changeName, intervalDuration);

// Toggle interval duration after 4 seconds
setTimeout(() => {
  intervalDuration = 2000; // Slow interval
  clearInterval(changeNameInterval); // Clear the initial interval
  changeNameInterval = setInterval(changeName, intervalDuration); // Set new interval
}, 1500);
