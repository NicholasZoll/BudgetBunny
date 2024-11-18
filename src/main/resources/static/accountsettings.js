// Purpose: JavaScript for the help page.
// Fetch the user's information and display it
fetch('/getUserInfo')
    .then(response => response.json())
    .then(userInfo => {
        document.getElementById('user-firstname').textContent = userInfo.firstname;
        document.getElementById('user-lastname').textContent = userInfo.lastname;
        document.getElementById('user-email').textContent = userInfo.email;
        document.getElementById('account-user-firstname').textContent = userInfo.firstname;
        document.getElementById('account-user-lastname').textContent = userInfo.lastname;
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

    document.getElementById('profileBtn').addEventListener('click', function() {
        window.location.href = 'accountsettings.html';
    });


    document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match.');
            return;
        }

        const data = {
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        fetch('/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Password change failed');
            }
            return response.text(); // Use response.text() instead of response.json()
        })
        .then(data => {
            alert('Password changed successfully!');
            document.getElementById('changePasswordForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to change password. You may have inputted your current password incorrectly. Please try again.');
        });
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