let form = document.getElementById("register-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("psw").value.trim();
    let password_repeat = document.getElementById("pswr").value.trim();

    if (!email || !password || !password_repeat) {
        alert("Please fill in all fields");
        return;
    }
    if (password !== password_repeat) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === email)) {
        alert("This email is already registered.");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email }));

    location.href = "main.html";
});
