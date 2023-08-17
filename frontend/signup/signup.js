const form = document.getElementById("myform");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const confirmPassword = document.getElementById("cpassword").value;

  if (password.value !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  const user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  try {
    var res = await axios.post("http://localhost:3000/user/signup", user);
    console.log("success");
    window.location.href = "../login/login.html";
  } catch (error) {
    console.log(error);
    alert(
      "Signup failed might be because username or email is already registered!"
    );
  }
});
