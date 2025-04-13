const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value.trim();
    let psw = document.getElementById('password').value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email);
    
    if (!user) {
        alert("User not found!");
        return;
    }

    if (user.password !== psw) {
        alert("Incorrect password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Login successful!");
    window.location.href = "main.html";
});