const groupId = localStorage.getItem("groupId");
const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = token;

const groupName = document.getElementById("group-name");
const msgContainer = document.getElementById("msg-container");
const messageform = document.getElementById("messageform");
const message = document.getElementById("message");

const socket = io("http://localhost:3000", {
  auth: {
    token: token,
  },
});

socket.emit("join", groupId);

socket.on("message", (data) => {
  const div = document.createElement("div");
  div.classList = "message";
  div.innerText = data.sender + ": " + data.content;
  msgContainer.appendChild(div);
});

messageform.addEventListener("submit", async (e) => {
  e.preventDefault();

  socket.emit("sendMessage", { groupId, content: message.value });
  message.value = "";
});

document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await axios.get(
    `http://localhost:3000/${groupId}/messages`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const { messages } = data;
  groupName.innerText = data.groupName.toUpperCase();

  for (let i = 0; i < messages.length; i++) {
    const div = document.createElement("div");
    div.classList = "message";
    div.innerText =
      messages[i].senderName.toUpperCase() + ": " + messages[i].content;
    msgContainer.appendChild(div);
  }
});

const del_btn = document.getElementById("deletegroup");

del_btn.addEventListener("click", async () => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/user/groups/${groupId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
    window.location.href = "../dashboard/dashboard.html";
  } catch (error) {
    alert("You are not an admin!");
  }
});
