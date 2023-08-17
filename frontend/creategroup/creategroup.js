const form = document.getElementById("myform");
const groupname = document.getElementById("groupname");

const token = localStorage.getItem("token");

// Set default authorization header for every request
axios.defaults.headers.common["Authorization"] = token;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/create", {
      name: groupname.value,
    });

    window.location.href = "../dashboard/dashboard.html";
  } catch (error) {
    alert(error);
  }
});
