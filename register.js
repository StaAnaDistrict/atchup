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
        return; // Stop the form submission
    }

    // Show spinner and overlay
    spinner.style.display = 'block';
    overlay.style.display = 'block';
    // Hide any existing messages
    registrationMessage.textContent = '';
    registrationMessage.style.display = 'none';

    const formData = new FormData();
    formData.append('firstname', document.getElementById('firstname').value);
    formData.append('lastname', document.getElementById('lastname').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    fetch('https://script.google.com/macros/s/AKfycbyiM16I5BQqXbnISnrC1xqxy3euDdimi6Mo_Ngg-G5VC5-iu7FzCvEoAkGfcrpIzI1J/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(response => {
        // Hide spinner and overlay
        spinner.style.display = 'none';
        overlay.style.display = 'none';

        if (response.status === 'error') {
            registrationMessage.textContent = response.message;
            registrationMessage.style.color = 'yellow';
            registrationMessage.style.display = 'block';
        } else {
            registrationMessage.textContent = 'Registration submitted! An email will be sent to you within 24 hours for confirmation.';
            registrationMessage.style.color = 'white';
            registrationMessage.style.display = 'block';

            // Clear all input fields
            document.getElementById('registerForm').reset();
            
            // Reset the label positions if using floating label effect
            document.querySelectorAll('.form input').forEach(input => {
                input.value = '';
                const label = input.nextElementSibling;
                if (label) {
                    label.classList.remove('filled');
                }
            });
        }
    })
    .catch(error => {
        // Hide spinner and overlay
        spinner.style.display = 'none';
        overlay.style.display = 'none';

        console.error('Error!', error.message);
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
