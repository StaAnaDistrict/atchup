document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registrationMessage = document.getElementById('registrationMessage');
    const spinner = document.getElementById('spinner');
    const overlay = document.getElementById('overlay');

    // Check if passwords match
    if (password !== confirmPassword) {
        registrationMessage.textContent = 'Passwords do not match!';
        registrationMessage.style.color = 'yellow';
        return;
    }

    // Show spinner and overlay
    spinner.style.display = 'block';
    overlay.style.display = 'block';
    registrationMessage.style.display = 'none';

    // Create URL-encoded string manually
    const formData = new URLSearchParams();
    formData.append('firstname', document.getElementById('firstname').value);
    formData.append('lastname', document.getElementById('lastname').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    fetch('https://script.google.com/macros/s/AKfycbyiM16I5BQqXbnISnrC1xqxy3euDdimi6Mo_Ngg-G5VC5-iu7FzCvEoAkGfcrpIzI1J/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(response => response.json())
    .then(data => {
        // Hide spinner and overlay
        spinner.style.display = 'none';
        overlay.style.display = 'none';

        if (data.status === 'duplicate') {
            registrationMessage.textContent = data.message;
            registrationMessage.style.color = 'yellow';
            registrationMessage.style.display = 'block';
        } else if (data.status === 'success') {
            registrationMessage.textContent = 'Registration submitted! An email will be sent to you within 24 hours for confirmation.';
            registrationMessage.style.color = 'white';
            registrationMessage.style.display = 'block';

            // Clear form
            document.getElementById('registerForm').reset();
            
            // Reset floating labels
            document.querySelectorAll('.form input').forEach(input => {
                input.value = '';
                const label = input.nextElementSibling;
                if (label) {
                    label.classList.remove('filled');
                }
            });
        } else {
            throw new Error(data.message || 'Unknown error occurred');
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        overlay.style.display = 'none';

        console.error('Error:', error);
        registrationMessage.textContent = 'An error occurred. Please try again.';
        registrationMessage.style.color = 'red';
        registrationMessage.style.display = 'block';
    });
});

//sign in
document.getElementById('signInLink').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    window.location.href = 'signin.html'; // Redirect to signin page
});
