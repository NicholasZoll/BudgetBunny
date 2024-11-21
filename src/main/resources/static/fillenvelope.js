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
const currentSpentElement = document.getElementById('current-spent');
// Update the amount based on selected fill option
function updateAmountField() {
    const selectedEnvelope = envelopeDropdown.options[envelopeDropdown.selectedIndex];
    const maxAmount = selectedEnvelope.getAttribute('data-max');
    const currentSpent = selectedEnvelope.getAttribute('data-spent');

    currentSpentElement.textContent = currentSpent;

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
// Initial update on page load
window.onload = async function() {
    await loadEnvelopes();
    updateAmountField();
};



async function loadEnvelopes() {
    try {
        const response = await fetch('/envelopes/userEnvelopes');
        const envelopes = await response.json();

        envelopeDropdown.innerHTML = ''; // Clear existing options

        envelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.id;
            option.textContent = `${envelope.name} (Max: $${envelope.budget})`;
            option.setAttribute('data-max', envelope.budget);
            option.setAttribute('data-spent', envelope.spent);
            envelopeDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading envelopes:', error);
    }
}

// Function to handle form submission
async function submitForm() {
    const selectedEnvelope = envelopeDropdown.value;
    const date = document.getElementById('date').value;
    const amount = parseFloat(amountInput.value);
    const notes = document.getElementById('notes').value;

    if (!date || !amount) {
        alert('Please fill in all required fields.');
        return;
    }

    const selectedOption = envelopeDropdown.options[envelopeDropdown.selectedIndex];
    const maxAmount = parseFloat(selectedOption.getAttribute('data-max'));
    const currentSpent = parseFloat(selectedOption.getAttribute('data-spent'));

    if (amount + currentSpent > maxAmount) {
        alert('Amount exceeds the budget.');
        return;
    }

    try {
        const response = await fetch(`/envelopes/${selectedEnvelope}/updateBalance`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amount),
        });

        if (response.ok) {
            alert('Envelope updated successfully!');
            goHome(); // Navigate home or close the modal
        } else {
            const errorMessage = await response.text();
            alert(`Failed to update envelope: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error updating envelope:', error);
    }
}