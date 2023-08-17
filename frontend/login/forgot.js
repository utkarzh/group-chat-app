const form = document.getElementById("myform");
const email = document.getElementById("email");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(email.value);
  try {
    const resp = await axios.post(
      "http://localhost:3000/password/forgotpassword",
      {
        email: email.value,
      }
    );
    alert("Check your mail to reset the password!");
  } catch (error) {
    alert(
      "Most probably this email is not registered otherwise backend error my friend!"
    );
  }
});
