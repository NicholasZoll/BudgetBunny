// Purpose: JavaScript for the help page.
// Fetch the user's information and display it
fetch('/getUserInfo')
    .then(response => response.json())
    .then(userInfo => {
        document.getElementById('user-firstname').textContent = userInfo.firstname;
        document.getElementById('user-lastname').textContent = userInfo.lastname;
    })
    .catch(error => {
        console.error('Error fetching user information:', error);
    });

document.addEventListener("DOMContentLoaded", function() {
    fetch('/isLoggedIn')
        .then(response => response.json())
        .then(isLoggedIn => {
            if (!isLoggedIn) {
                window.location.href = 'loginaccount.html';
            }
        })
        .catch(error => {
            console.error('Error checking login status:', error);
            window.location.href = 'loginaccount.html';
        });
});

// Get the modal and logout button elements
const logoutModal = document.getElementById("logoutModal");
const logoutLink = document.getElementById("logoutLink");

// Show the modal when the user clicks on the "Logout" link
logoutLink.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default link action
    logoutModal.style.display = "flex"; // Show the modal
});

// Close the modal and stay on the page
function closeLogoutModal() {
    logoutModal.style.display = "none";
}

// Redirect to the logout page when confirmed
function confirmLogout() {
    fetch('/logout', {
    method: 'POST',
    credentials: 'same-origin' // Include credentials in the request
})
.then(response => {
    if (response.ok) {
        window.location.href = 'loginaccount.html'; // Redirect to the login page
    } else {
        console.error('Logout failed');
    }
})
.catch(error => {
    console.error('Error:', error);
});
}