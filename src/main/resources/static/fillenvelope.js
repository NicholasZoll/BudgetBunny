// Function to close the modal and clear the iframe NOTE: this only works in live server due to browsers enforce security measures that block access to resources from different origins, while using a live server removes these restrictions
function closeModal() {
    const modal = window.parent.document.getElementById('myModal'); // Access the modal in the parent document
    const iframe = window.parent.document.getElementById('externalPage'); // Access the iframe in the parent document

    if (modal) {
        modal.style.display = "none"; // Close the modal
    }

    if (iframe) {
        iframe.src = ""; // Clear the iframe's src
    }
}

// Helper function to navigate home
function goHome() {
    closeModal(); // Close the modal and clear iframe
    window.location.href = 'index.html'; // Navigate to home page
}

// Get form elements
const fillOptionAdd = document.getElementById('addAmount');
const fillOptionFill = document.getElementById('fillUp');
const amountInput = document.getElementById('amount');
const envelopeDropdown = document.getElementById('envelope-dropdown');

// Update the amount based on selected fill option
function updateAmountField() {
    const selectedEnvelope = envelopeDropdown.options[envelopeDropdown.selectedIndex];
    const maxAmount = selectedEnvelope.getAttribute('data-max');

    if (fillOptionFill.checked) {
        // Automatically fill the amount to max if "Fill Up" is selected
        amountInput.value = maxAmount;
        amountInput.disabled = true; // Disable manual input
    } else {
        // Allow manual input if "Add" is selected
        amountInput.value = '';
        amountInput.disabled = false;
    }
}

// Attach event listeners to radio buttons and envelope dropdown
fillOptionAdd.addEventListener('change', updateAmountField);
fillOptionFill.addEventListener('change', updateAmountField);
envelopeDropdown.addEventListener('change', updateAmountField);

// Initial update on page load
window.onload = updateAmountField;

function submitForm() {
    const selectedEnvelope = envelopeDropdown.value;
    const date = document.getElementById('date').value;
    const amount = amountInput.value;
    const notes = document.getElementById('notes').value;

    if (!date || !amount) {
        alert('Please fill in all required fields.');
        return;
    }

    console.log(`Saving data:\nEnvelope: ${selectedEnvelope}\nAmount: $${amount}\nDate: ${date}\nNotes: ${notes}`);
    // Here you would handle form submission logic, e.g., saving the data or sending it to a server.
}
