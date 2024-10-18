document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const registrationMessage = document.getElementById('registrationMessage');

    // Check if passwords match
    if (password !== confirmPassword) {
        registrationMessage.textContent = 'Passwords do not match!';
        registrationMessage.style.color = 'yellow';
        return; // Stop the form submission
    }

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
        console.log('Response received');
        registrationMessage.textContent = 'Registration submitted! Please wait within 24 hours for approval.';
        registrationMessage.style.color = 'white';

        // Clear all input fields
        document.getElementById('registerForm').reset();
        
        // If you're using the floating label effect, you might need to reset the label positions
        document.querySelectorAll('.form input').forEach(input => {
            input.value = '';
            const label = input.nextElementSibling;
            if (label) {
                label.classList.remove('filled');
            }
        });
    })
    .catch(error => {
        console.error('Error!', error.message);
        registrationMessage.textContent = 'An error occurred. Please try again.';
        registrationMessage.style.color = 'red';
    });
});

//sign in
document.getElementById('signInLink').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    window.location.href = 'signin.html'; // Redirect to signin page
});