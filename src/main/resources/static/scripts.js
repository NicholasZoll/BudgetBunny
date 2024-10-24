function showTab(tab) {
    const contents = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    contents.forEach(content => content.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    event.currentTarget.classList.add('active');
}


window.onload = function() {
    // Get modal and button elements
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModal");
    var span = document.getElementsByClassName("close-btn")[0];
    var iframe = document.getElementById("externalPage");

    // Open the modal and load external page when the button is clicked
    btn.onclick = function() {
        modal.style.display = "flex";
        iframe.src = "addedit.html"; // Path to the external HTML page
    };

    // Close the modal when the close button is clicked
    span.onclick = function() {
        modal.style.display = "none";
        iframe.src = ""; // Clear iframe src to prevent loading
    };

    // Close modal if user clicks outside of the modal content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            iframe.src = ""; // Clear iframe src
        }
    };
};



