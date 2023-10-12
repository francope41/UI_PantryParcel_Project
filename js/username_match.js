document.getElementById("loginButton").addEventListener("click", function() {
    var enteredUsername = document.querySelector(".login input[type=text]").value;
    var enteredPassword = document.querySelector(".login input[type=password]").value;

    fetch('users.json')
    .then(response => response.json())
    .then(data => {
        var user = data.users.find(u => u.username === enteredUsername && u.password === enteredPassword);

        if (user) {
            // If credentials are correct, redirect to the "Redirected" page
            window.location.href = "redirect.html";
        } else {
            alert("Invalid username or password");
        }
    })
    .catch(error => {
        console.error("Error fetching users:", error);
    });
});
