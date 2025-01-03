// Fetch user information and display it
fetch('/getUserInfo')
    .then(response => response.json())
    .then(userInfo => {
        document.getElementById('user-firstname').textContent = userInfo.firstname;
        document.getElementById('user-lastname').textContent = userInfo.lastname;
        document.getElementById('user-email').textContent = userInfo.email;
        document.getElementById('account-user-firstname').textContent = userInfo.firstname;
        document.getElementById('account-user-lastname').textContent = userInfo.lastname;
    })
    .catch(error => console.error('Error fetching user information:', error));

document.addEventListener("DOMContentLoaded", function () {
    // Redirect if not logged in
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

    // Profile Button Navigation
    document.getElementById('profileBtn').addEventListener('click', () => {
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











    // Modal Logic
    const modal = document.getElementById('myModal');
    const iframe = document.getElementById('externalPage');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.openModal').forEach(button => {
        button.addEventListener('click', function () {
            iframe.src = this.getAttribute('data-url');
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        iframe.src = '';
    });

    window.addEventListener('click', event => {
        if (event.target === modal) {
            modal.style.display = 'none';
            iframe.src = '';
        }
    });

    // Logout Modal Logic
    const logoutModal = document.getElementById('logoutModal');
    document.getElementById('logoutLink').addEventListener('click', event => {
        event.preventDefault();
        logoutModal.style.display = 'flex';
    });

    window.closeLogoutModal = () => {
        logoutModal.style.display = 'none';
    };

    window.confirmLogout = () => {
        fetch('/logout', { method: 'POST', credentials: 'same-origin' })
            .then(response => {
                if (response.ok) {
                    window.location.href = 'loginaccount.html';
                } else {
                    console.error('Logout failed');
                }
            })
            .catch(error => console.error('Error:', error));
    };
});
