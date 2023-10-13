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

document.getElementById("registrationButton").addEventListener("click", function() {
    var enteredUsername = document.querySelector(".registration input[type=text]").value;
    var enteredPassword = document.querySelector(".registration input[type=password]").value;
    var confirmPassword = document.querySelector(".registration input[type=password][placeholder='Confirm your password']").value;

    if (enteredPassword !== confirmPassword) {
        alert("Password and confirm password do not match. Please try again.");
        return;
    }

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            // Check if the entered username already exists
            var userExists = data.users.some(u => u.username === enteredUsername);

            if (userExists) {
                alert("Username already exists. Please choose a different one.");
            } else {
                // Add the new user to the list and update the JSON
                data.users.push({ username: enteredUsername, password: enteredPassword });

                // Convert the updated data back to a JSON string
                var updatedData = JSON.stringify(data);

                // Save the updated data to the users.json file
                fetch('users.json', {
                    method: 'PUT',
                    body: updatedData,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(() => {
                        // Redirect to the "Redirected" page after registration
                        window.location.href = "redirect.html";
                    })
                    .catch(error => {
                        console.error("Error saving user data:", error);
                    });
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
        });
});