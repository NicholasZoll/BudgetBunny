
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

// Function to initialize the envelope and account lists from localStorage
function initPage() {
    loadEnvelopes(); // Load both monthly and annual envelopes
    loadAccounts();  // Load accounts
}

// Function to load envelopes from localStorage
async function loadEnvelopes() {
    const envelopes = await fetch('/envelopes/userEnvelopes').then(e => e.json());
    console.log(envelopes);
    const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

    displayEnvelopes(envelopes, 'monthly-envelopes');
    displayEnvelopes(annualEnvelopes, 'annual-envelopes');
}

// Function to display envelopes in the appropriate section
function displayEnvelopes(envelopes, elementId) {
    const envelopeList = document.getElementById(elementId);
    envelopeList.innerHTML = ''; // Clear current list

    envelopes.forEach((envelope, index) => {
        const envelopeForm = document.createElement('div');
        envelopeForm.className = 'envelope-form';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = envelope.name;

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.value = envelope.budget;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => deleteEnvelope(elementId, index);

        envelopeForm.appendChild(nameInput);
        envelopeForm.appendChild(amountInput);
        envelopeForm.appendChild(deleteButton);

        envelopeList.appendChild(envelopeForm);
    });
}

// Function to add a new envelope
async function addEnvelope(type) {
    const label = prompt('Enter the name of the envelope:');
    const budget = prompt('Enter the budget for this envelope:');
    await fetch ('/envelopes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: label, budget, spent:0})
    })
    loadEnvelopes();
}

// Function to delete an envelope
function deleteEnvelope(type, index) {
    const envelopes = JSON.parse(localStorage.getItem(`${type}`)) || [];
    envelopes.splice(index, 1); // Remove the envelope
    localStorage.setItem(`${type}`, JSON.stringify(envelopes));

    loadEnvelopes(); // Refresh the display
}

// Function to load accounts from localStorage
function loadAccounts() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const accountDropdown = document.getElementById('account-dropdown');
    accountDropdown.innerHTML = ''; // Clear existing options

    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account;
        option.innerHTML = account;
        accountDropdown.appendChild(option);
    });
}

// Function to save changes (both envelopes and accounts)
function saveChanges() {
    const monthlyEnvelopes = [];
    const annualEnvelopes = [];

    document.querySelectorAll('#monthly-envelopes .envelope-form').forEach(form => {
        const name = form.querySelector('input[type="text"]').value;
        const amount = form.querySelector('input[type="number"]').value;
        if (name && amount) {
            monthlyEnvelopes.push({ name, amount });
        }
    });

    document.querySelectorAll('#annual-envelopes .envelope-form').forEach(form => {
        const name = form.querySelector('input[type="text"]').value;
        const amount = form.querySelector('input[type="number"]').value;
        if (name && amount) {
            annualEnvelopes.push({ name, amount });
        }
    });

    localStorage.setItem('monthlyEnvelopes', JSON.stringify(monthlyEnvelopes));
    localStorage.setItem('annualEnvelopes', JSON.stringify(annualEnvelopes));

    alert('Envelopes saved successfully!');
}

// Helper function to navigate home
function goHome() {
    closeModal(); // Close the modal and clear iframe
    window.location.href = 'index.html'; // Navigate to home page
}

// Initialize the page
window.onload = initPage;