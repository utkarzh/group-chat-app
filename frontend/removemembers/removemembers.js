const groupId = localStorage.getItem("groupId");
const token = localStorage.getItem("token");
const members = document.getElementById("members");
axios.defaults.headers.common["Authorization"] = token;
console.log(groupId);

const form = document.getElementById("myform");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const membersarray = members.value.split(" ");
  console.log(membersarray);
  try {
    const res = await axios.delete(
      `http://localhost:3000/${groupId}/removeMembers`,
      {
        data: {
          usernames: membersarray,
        },
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.href = "../chat/chat.html";
  } catch (error) {
    alert(error);
  }
});
