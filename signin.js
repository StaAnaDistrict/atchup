console.log('Script started');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const forgotPasswordMessage = document.getElementById('forgotPasswordMessage');

    console.log('Elements:', {
        loginForm, forgotPasswordBtn, signUpBtn, loginButton, emailInput, passwordInput, loginMessage, forgotPasswordMessage
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === '1') {
        loginMessage.textContent = 'Invalid email or password';
        loginMessage.style.display = 'block';
        loginMessage.style.color = 'red';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('Attempting login with:', { email, password });
    
        fetch('/.netlify/functions/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, action: 'login' })
        })
        .then(response => {
            console.log('Received response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Parsed response data:', data);
            if (data.result === 'success') {
                console.log('Login successful');
                window.location.href = '/index.html';
            } else {
                console.log('Login failed:', data.message);
                loginMessage.textContent = data.message || 'Invalid email or password';
                loginMessage.style.display = 'block';
                loginMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginMessage.textContent = 'An error occurred. Please try again.';
            loginMessage.style.display = 'block';
            loginMessage.style.color = 'red';
        });
    });

    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (forgotPasswordMessage) {
                forgotPasswordMessage.innerHTML = "To recover your username or password, please email:<br><strong>sacesofficial@gmail.com</strong><br><br>Subject: Account Recovery<br><br>In the email, please provide the email address you used during registration.";
                forgotPasswordMessage.style.display = 'block';
            }
        });
    }

    if (signUpBtn) {
        signUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'registration.html';
        });
    }
});
