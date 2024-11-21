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

fetch('/envelopes/userEnvelopes').then(r => r.json()).then(envelopes => {
    envelopes.forEach(envelope => {
        const option = document.createElement('option');
        option.value = envelope.id;
        option.setAttribute('data-spent', envelope.spent.toString());
        option.textContent = envelope.name;
        envelopeDropdown.appendChild(option);
    });
});

function showHideAmount() {
    amountInput.style.visibility = fillOptionAdd.checked ? 'visible' : 'hidden';
}

setInterval(showHideAmount, 100);

async function submitForm() {
    const selectedEnvelope = envelopeDropdown.value;
    const date = document.getElementById('date').value;
    const amount = amountInput.value;
    const notes = document.getElementById('notes').value;
    const isAdd = document.getElementById('addAmount').checked;
    const envelopeDom = envelopeDropdown.selectedOptions[0];

    if (isAdd && (!date || !amount) || !isAdd && !date) {
        alert('Please fill in all required fields.');
        return;
    }

    const transaction = {
        title: 'Filled Envelope',
        date,
        amount: isAdd ? -parseFloat(amount) : -Number(envelopeDom.getAttribute('data-spent')),
        envelope: { id: Number(selectedEnvelope) },
        // account: { id: document.getElementById('account-dropdown').value },
        notes,
    };
    try {
        const response = await fetch('/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transaction),
        });
        alert('Filled envelope successfully!');
    } catch (e) {
        alert('Failed to fill envelope. Please try again.');
    }
    // Here you would handle form submission logic, e.g., saving the data or sending it to a server.
}
