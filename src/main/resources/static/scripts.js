function showTab(tab) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    event.currentTarget.classList.add('active');
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded"); // Check if script is loading

    // Get all elements with the class 'openModal'
    const modalButtons = document.querySelectorAll(".openModal");
    const modal = document.getElementById("myModal");
    const iframe = document.getElementById("externalPage");
    const closeBtn = document.querySelector(".close-btn");

    // Attach click event to each button
    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the URL from the button's data attribute
            const pageUrl = this.getAttribute("data-url");

            // Set the iframe's src to the selected page
            iframe.src = pageUrl;

            // Show the modal
            modal.style.display = "flex";
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        iframe.src = ""; // Clear the iframe's src when closing the modal
    });

    // Optionally close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            iframe.src = ""; // Clear the iframe's src
        }
    });

    // Select the logout button
    const logoutButton = document.querySelector(".logout");

    // Check if the button exists
    if (logoutButton) {
        // Add click event listener for logout confirmation
        logoutButton.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Show confirmation dialog
            const confirmLogout = confirm("Are you sure you want to log out?");
            
            // Redirect to login page if confirmed
            if (confirmLogout) {
                window.location.href = "loginaccount.html";
            } else {
                console.log("User canceled logout"); // Log cancellation for debugging
            }
        });
    } else {
        console.error("Logout button not found");
    }
});
