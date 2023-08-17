const groupId = localStorage.getItem("groupId");
const token = localStorage.getItem("token");
const members = document.getElementById("members");
axios.defaults.headers.common["Authorization"] = token;
console.log(groupId);

const form = document.getElementById("myform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const membersarray = members.value.split(" ");
  try {
    const res = await axios.post(
      `http://localhost:3000/${groupId}/addmembers`,
      {
        usernames: membersarray,
      }
    );
    window.location.href = "../chat/chat.html";
  } catch (error) {
    alert(error);
  }
});
