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
    
    // Send the email
    emailjs.send("service_7zvgict", "template_8jrk7kq", templateParams)
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

// Handle thank you overlay close button
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
});
 