document.querySelector(".login form").addEventListener("submit", function(event) {
    event.preventDefault();

    var enteredUsername = event.target[0].value;
    var enteredPassword = event.target[1].value;

    fetch('users.json')
    .then(response => response.json())
    .then(data => {
        var user = data.users.find(u => u.username === enteredUsername && u.password === enteredPassword);

        if (user) {
            alert("Logged in successfully!");
            // Redirect to a logged-in page or perform another action
        } else {
            alert("Invalid username or password");
        }
    })
    .catch(error => {
        console.error("Error fetching users:", error);
    });
});
