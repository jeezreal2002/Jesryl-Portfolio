// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendEmail(event){
    // Prevent the default form submission
    if (event) event.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    
    // Get submit button
    const submitBtn = document.querySelector('.contact .right-side form button');
    
    // Validate inputs
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert("Please fill in all fields");
        return;
    }
    
    // Validate email format
    if (!isValidEmail(emailInput.value)) {
        alert("Please enter a valid email address");
        emailInput.focus();
        return;
    }
    
    // Create template parameters
    const templateParams = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        time: new Date().toLocaleString()
    };
    
    // Show loading state on button
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Send the email notification to you
    emailjs.send("service_j1joxlh", "template_avptox9", templateParams)
    .then(function(response) {
        // Send auto-reply to the user
        const autoReplyParams = {
            name: nameInput.value,
            to_email: emailInput.value, // Changed from email to to_email
            email: emailInput.value,    // Keep email as backup
            title: messageInput.value.substring(0, 50) + (messageInput.value.length > 50 ? "..." : "")
        };
        
        return emailjs.send("service_j1joxlh", "template_5l2bx28", autoReplyParams);
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        
        // Reset form
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        
        // Show thank you overlay
        const thankYouOverlay = document.getElementById('thank-you-overlay');
        if (thankYouOverlay) {
            thankYouOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
    }, function(error) {
        console.log("FAILED...", error);
        
        // Show error message
        alert("Failed to send message. Please try again.");
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

// Handle thank you overlay close button and form validation
document.addEventListener('DOMContentLoaded', function() {
    const thankYouCloseBtn = document.getElementById('thank-you-close-btn');
    const thankYouOverlay = document.getElementById('thank-you-overlay');
    
    if (thankYouCloseBtn && thankYouOverlay) {
        thankYouCloseBtn.addEventListener('click', function() {
            thankYouOverlay.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Also close when clicking outside the content
        thankYouOverlay.addEventListener('click', function(e) {
            if (e.target === thankYouOverlay) {
                thankYouOverlay.classList.remove('show');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Real-time email validation
    const emailInput = document.getElementById("email");
    if (emailInput) {
        // Add CSS to head for validation styles
        const style = document.createElement('style');
        style.textContent = `
            .email-valid {
                border-color: #4CAF50 !important;
                background-color: rgba(76, 175, 80, 0.05) !important;
            }
            .email-invalid {
                border-color: #f44336 !important;
                background-color: rgba(244, 67, 54, 0.05) !important;
            }
            .email-status {
                font-size: 12px;
                margin-top: 4px;
                display: none;
            }
            .email-error {
                color: #f44336;
            }
            .email-success {
                color: #4CAF50;
            }
        `;
        document.head.appendChild(style);
        
        // Create status message elements
        const statusContainer = document.createElement('div');
        statusContainer.style.position = 'relative';
        
        const emailStatus = document.createElement('span');
        emailStatus.className = 'email-status';
        emailStatus.style.position = 'absolute';
        emailStatus.style.left = '0';
        emailStatus.style.marginTop = '2px';
        
        // Insert status message after email input
        emailInput.parentNode.insertBefore(statusContainer, emailInput.nextSibling);
        statusContainer.appendChild(emailStatus);
        
        // Add input event listener
        emailInput.addEventListener('input', function() {
            const email = emailInput.value.trim();
            
            // Don't show validation for empty input
            if (email === '') {
                emailInput.classList.remove('email-valid', 'email-invalid');
                emailStatus.style.display = 'none';
                return;
            }
            
            // Validate email format
            if (isValidEmail(email)) {
                emailInput.classList.remove('email-invalid');
                emailInput.classList.add('email-valid');
                emailStatus.className = 'email-status email-success';
                emailStatus.textContent = '✓ Valid email';
                emailStatus.style.display = 'block';
            } else {
                emailInput.classList.remove('email-valid');
                emailInput.classList.add('email-invalid');
                emailStatus.className = 'email-status email-error';
                emailStatus.textContent = '✗ Please enter a valid email';
                emailStatus.style.display = 'block';
            }
        });
        
        // Check on blur to ensure validation
        emailInput.addEventListener('blur', function() {
            if (emailInput.value.trim() !== '' && !isValidEmail(emailInput.value)) {
                emailInput.classList.add('email-invalid');
                emailStatus.className = 'email-status email-error';
                emailStatus.textContent = '✗ Please enter a valid email';
                emailStatus.style.display = 'block';
            }
        });
    }
});
 