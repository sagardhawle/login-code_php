// Signin Form Handler
document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const signinMessage = document.getElementById('signinMessage');
    document.querySelectorAll('#signinSection .error').forEach(error => error.style.display = 'none');
    signinMessage.style.display = 'none';
    signinMessage.className = 'message';

    const username = document.getElementById('signinUsername').value.trim();
    const password = document.getElementById('signinPassword').value;

    let isValid = true;

    if (!username) {
        document.getElementById('signinUsernameError').style.display = 'block';
        isValid = false;
    }

    if (!password) {
        document.getElementById('signinPasswordError').style.display = 'block';
        isValid = false;
    }

    if (!isValid) return;

    fetch('/php/signin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            signinMessage.textContent = 'Signin successful! Redirecting...';
            signinMessage.className = 'message success';
            signinMessage.style.display = 'block';
            this.reset();

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'https://www.youtube.com';
            }, 2000);
        } else {
            signinMessage.textContent = data.message;
            signinMessage.className = 'message error';
            signinMessage.style.display = 'block';
        }
    })
    .catch(error => {
        signinMessage.textContent = 'Error occurred during signin';
        signinMessage.className = 'message error';
        signinMessage.style.display = 'block';
    });
});
