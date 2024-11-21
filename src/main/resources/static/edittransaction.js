// Function to close the modal and clear the iframe NOTE: this only works in live server due to browsers enforcing security measures that block access to resources from different origins, while using a live server removes these restrictions
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

// Function to initialize the envelope, account lists, and transactions
function initPage() {
    loadEnvelopes(); // Load both monthly and annual envelopes
    //loadAccounts();  // Load accounts
    loadTransactions(); // Load all transactions
}

// Function to load transactions and populate the dropdown
async function loadTransactions() {
    try {
        const response = await fetch('/transactions/userTransactions');
        const data = await response.json();

        console.log('Fetched Data:', data); // Debug response

        if (!Array.isArray(data)) {
            throw new Error('Expected an array but got: ' + typeof data);
        }

        // Process transactions
        data.forEach(transaction => {
            const option = document.createElement('option');
            option.value = transaction.id;
            option.innerHTML = transaction.title;
            document.getElementById('transactionSelect').appendChild(option);
        });
    } catch (error) {
        console.error('Error loading transactions:', error);
    }
}


// Function to load envelopes from the server
async function loadEnvelopes() {
    try {
        const envelopeDropdown = document.getElementById('editEnvelope'); // Ensure it's defined inside the function
        if (!envelopeDropdown) {
            throw new Error('Envelope dropdown element not found.');
        }
        envelopeDropdown.innerHTML = ''; // Clear dropdown options

        const response = await fetch('/envelopes/userEnvelopes');
        const envelopes = await response.json();

        console.log('Fetched Envelopes:', envelopes); // Debugging

        envelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.id;
            option.textContent = envelope.name;
            envelopeDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading envelopes:', error);
    }
}


// Function to load accounts from local storage (or modify for server if needed)
function loadAccounts() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const accountDropdown = document.getElementById('editAccount');
    accountDropdown.innerHTML = '<option value="">Select an account</option>'; // Reset dropdown

    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id; // Use account ID for better linking
        option.textContent = account.name;
        accountDropdown.appendChild(option);
    });
}

// Function to populate the transaction form on selection
// Function to populate the transaction form with data
// Function to populate the transaction form with data
function populateTransactionForm(transaction) {
    // Populate the form fields
    document.getElementById('editTitle').value = transaction.title || '';
    document.getElementById('editDate').value = transaction.date || '';
    document.getElementById('editAmount').value = transaction.amount || '';
    document.getElementById('editEnvelope').value = transaction.envelope?.id || '';
    document.getElementById('editNotes').value = transaction.notes || '';

    // Update the transaction dropdown to select the current transaction
    const transactionSelect = document.getElementById('transactionSelect');
    if (transactionSelect) {
        // Check if the transaction already exists in the dropdown
        let option = Array.from(transactionSelect.options).find(opt => opt.value === transaction.id);
        if (!option) {
            // If not, add it dynamically
            option = document.createElement('option');
            option.value = transaction.id;
            option.textContent = transaction.title;
            transactionSelect.appendChild(option);
        }
        transactionSelect.value = transaction.id; // Set the current transaction as selected
    }
}

// Attach this function to the window object for external access
window.populateTransactionForm = populateTransactionForm;

// Ensure the form resets properly when the dropdown changes
document.getElementById('transactionSelect').addEventListener('change', async function () {
    const transactionId = this.value;
    if (transactionId) {
        try {
            const response = await fetch(`/transactions/${transactionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch transaction details.');
            }
            const transaction = await response.json();
            populateTransactionForm(transaction);
        } catch (error) {
            console.error('Error loading transaction:', error);
        }
    } else {
        document.getElementById('editTransactionForm').reset(); // Reset the form if no transaction is selected
    }
});


// Attach this function to the window object for external access
window.populateTransactionForm = populateTransactionForm;

// Initialize the page when loaded
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const transactionId = urlParams.get('id');
    if (transactionId) {
        fetch(`/transactions/${transactionId}`)
            .then(response => response.json())
            .then(populateTransactionForm)
            .catch(error => console.error('Error populating transaction form:', error));
    }
};


// // Initialize the page and populate the form
// window.onload = () => {
//     initPage();
//     populateTransactionForm();
// };


// Function to save changes to the selected transaction
async function saveTransaction() {
    const transactionId = document.getElementById('transactionSelect').value;
    if (!transactionId) {
        alert('Please select a transaction to edit.');
        return;
    }

    const updatedTransaction = {
        title: document.getElementById('editTitle').value,
        date: document.getElementById('editDate').value,
        amount: parseFloat(document.getElementById('editAmount').value),
        envelope: { id: document.getElementById('editEnvelope').value },
        //account: { id: document.getElementById('editAccount').value },
        notes: document.getElementById('editNotes').value,
    };

    try {
        const response = await fetch(`/transactions/${transactionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTransaction),
        });

        if (response.ok) {
            alert('Transaction updated successfully!');
            loadTransactions(); // Refresh dropdown
        } else {
            alert('Failed to save changes. Please try again.');
        }
    } catch (error) {
        console.error('Error saving transaction:', error);
    }
}

// Function to delete the selected transaction
async function deleteTransaction() {
    const transactionId = document.getElementById('transactionSelect').value;
    if (!transactionId) {
        alert('Please select a transaction to delete.');
        return;
    }

    const confirmation = confirm('Are you sure you want to delete this transaction?');
    if (!confirmation) return;

    try {
        const response = await fetch(`/transactions/${transactionId}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Transaction deleted successfully!');
            loadTransactions(); // Refresh dropdown
            document.getElementById('editTransactionForm').reset(); // Clear form
        } else {
            alert('Failed to delete transaction. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting transaction:', error);
    }
}


// Attach event listeners
document.getElementById('transactionSelect').addEventListener('change', populateTransactionForm);
document.getElementById('save-btn').addEventListener('click', saveTransaction);
document.getElementById('delete-btn').addEventListener('click', deleteTransaction);

// Initialize the page
window.onload = initPage;


