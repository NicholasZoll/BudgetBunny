
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

function displayEnvelopes(envelopes, elementId) {
    const envelopeList = document.getElementById(elementId);
    envelopeList.innerHTML = ''; // Clear current list

    envelopes.forEach(envelope => {
        const envelopeForm = document.createElement('div');
        envelopeForm.className = 'envelope-form';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.value = envelope.name;
        nameInput.dataset.id = envelope.id; // Store the envelope ID for later use

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.value = envelope.budget;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = () => deleteEnvelope(envelope.id);

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
async function deleteEnvelope(envelopeId) {
    const confirmation = confirm("Are you sure you want to delete this envelope?");
    if (!confirmation) return;

    try {
        const response = await fetch(`/envelopes/${envelopeId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Envelope deleted successfully.");
            loadEnvelopes(); // Refresh the envelopes after deletion
        } else {
            alert("Failed to delete envelope. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting envelope:", error);
        alert("An error occurred. Please try again.");
    }
}


async function updateEnvelope(id, updatedData) {
    try {
        const response = await fetch(`/envelopes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert('Envelope updated successfully!');
            loadEnvelopes(); // Refresh the list
        } else {
            alert('Failed to update envelope. Please try again.');
        }
    } catch (error) {
        console.error('Error updating envelope:', error);
        alert('An error occurred. Please try again.');
    }
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

async function saveChanges() {
    const envelopesToUpdate = [];

    // Gather all envelopes from both sections
    document.querySelectorAll('.envelope-form').forEach(form => {
        const nameInput = form.querySelector('input[type="text"]');
        const amountInput = form.querySelector('input[type="number"]');
        const envelopeId = nameInput.dataset.id;

        if (envelopeId && nameInput.value && amountInput.value) {
            envelopesToUpdate.push({
                id: envelopeId,
                name: nameInput.value,
                budget: parseFloat(amountInput.value),
            });
        }
    });

    try {
        // Send bulk update to the server
        const response = await fetch('/envelopes/bulk-update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(envelopesToUpdate),
        });

        if (response.ok) {
            alert('All changes saved successfully!');
            loadEnvelopes(); // Refresh the envelopes
        } else {
            alert('Failed to save changes. Please try again.');
        }
    } catch (error) {
        console.error('Error saving changes:', error);
        alert('An error occurred while saving changes.');
    }
}



function showEnvelopeForm(type) {
    const modal = document.getElementById('envelope-form-modal');
    const formTitle = document.getElementById('form-title');
    modal.classList.remove('hidden');
    formTitle.textContent = `Add ${type === 'monthly' ? 'Monthly' : 'Annual'} Envelope`;

    const form = document.getElementById('envelope-form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('envelope-name').value;
        const budget = document.getElementById('envelope-budget').value;

        // Post data to server
        await fetch('/envelopes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, budget, spent: 0 }),
        });

        hideEnvelopeForm();
        loadEnvelopes();
    };
}

function hideEnvelopeForm() {
    const modal = document.getElementById('envelope-form-modal');
    modal.classList.add('hidden');
    document.getElementById('envelope-form').reset();
}

// Helper function to navigate home
function goHome() {
    closeModal(); // Close the modal and clear iframe
    window.location.href = 'index.html'; // Navigate to home page
}

// Initialize the page
window.onload = initPage;