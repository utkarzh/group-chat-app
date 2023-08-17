const groupId = localStorage.getItem("groupId");
const token = localStorage.getItem("token");
console.log(token);
axios.defaults.headers.common["Authorization"] = token;
const groupName = document.getElementById("group-name");
const msgContainer = document.getElementById("msg-container");
const messageform = document.getElementById("messageform");
const message = document.getElementById("message");

messageform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const res = await axios.post(
    `http://localhost:3000/${groupId}/sendMessage`,
    {
      content: message.value,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  window.location.reload();
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
  console.log(messages);
  console.log(messages[0]);

  groupName.innerText = data.groupName.toUpperCase();
  for (let i = 0; i < messages.length; i++) {
    const div = document.createElement("div");
    div.classList = "message";
    div.innerText =
      messages[i].senderName.toUpperCase() + ":  " + messages[i].content;
    msgContainer.appendChild(div);
  }
  //group name aur message ko show krdo
});

const del_btn = document.getElementById("deletegroup");
del_btn.addEventListener("click", async () => {
  // Make sure the headers are set correctly before making the request
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
