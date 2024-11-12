document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const user = {
        email: formData.get('email'),
        password: formData.get('password')
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.text();
    })
    .then(data => {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to the dashboard or home page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to login. Please check your credentials and try again.');
    });
});