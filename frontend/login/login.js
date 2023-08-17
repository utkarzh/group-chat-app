const form = document.getElementById("myform");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/user/login", {
      username: username.value,
      password: password.value,
    });
    const { token } = res.data;
    localStorage.setItem("token", token);

    window.location.href = "../dashboard/dashboard.html";
  } catch (error) {
    alert("Invalid username or Password");
  }
});
