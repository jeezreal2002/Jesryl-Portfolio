function sendEmail(event){
    // Prevent the default form submission
    if (event) event.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const toast = document.getElementById("toast-notification");
    const toastMessage = document.getElementById("toast-message");
    
    // Get submit button
    const submitBtn = document.querySelector('.contact .right-side form button');
    
    // Function to show toast
    function showToast(message, type) {
        // Remove all possible classes first
        toast.classList.remove('success', 'error', 'loading', 'show');
        
        // Add the appropriate class
        toast.classList.add(type, 'show');
        
        // Set the message
        toastMessage.textContent = message;
        
        // Hide the toast after a delay (except for loading state)
        if (type !== 'loading') {
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }
    }
    
    // Validate inputs
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        showToast("Please fill in all fields", "error");
        return;
    }
    
    // Create template parameters
    const templateParams = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
        time: new Date().toLocaleString()
    };
    
    // Show sending status
    showToast("Sending your message...", "loading");
    submitBtn.disabled = true;
    
    // Send the email
    emailjs.send("service_7zvgict", "template_8jrk7kq", templateParams)
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        
        // Show success message
        showToast("Message sent successfully!", "success");
        
        // Reset form
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
        
        // Re-enable button after a delay
        setTimeout(() => {
            submitBtn.disabled = false;
        }, 2000);
    }, function(error) {
        console.log("FAILED...", error);
        
        // Show error message
        showToast("Failed to send message. Please try again.", "error");
        
        // Re-enable button
        submitBtn.disabled = false;
    });
}
 