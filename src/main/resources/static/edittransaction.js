// // Function to close the modal and clear the iframe NOTE: this only works in live server due to browsers enforce security measures that block access to resources from different origins, while using a live server removes these restrictions
// function closeModal() {
//     const modal = window.parent.document.getElementById('myModal'); // Access the modal in the parent document
//     const iframe = window.parent.document.getElementById('externalPage'); // Access the iframe in the parent document

//     if (modal) {
//         modal.style.display = "none"; // Close the modal
//     }

//     if (iframe) {
//         iframe.src = ""; // Clear the iframe's src
//     }
// }

// // Helper function to navigate home
// function goHome() {
//     closeModal(); // Close the modal and clear iframe
//     window.location.href = 'index.html'; // Navigate to home page
// }

// document.addEventListener('DOMContentLoaded', function () {
//     const transactionSelect = document.getElementById('transactionSelect');

//     // Load accounts and envelopes
//     loadAccounts();
//     loadEnvelopes();
//     loadTransactions(); // Load transactions into the dropdown

//     // Function to load transactions into the dropdown
//     function loadTransactions() {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//         transactionSelect.innerHTML = '<option value="">Select a transaction</option>';
        
//         transactions.forEach((transaction, index) => {
//             const option = document.createElement('option');
//             option.value = index;
//             option.textContent = `${transaction.title} - $${transaction.amount}`;
//             transactionSelect.appendChild(option);
//         });
//     }

//     // Function to load envelopes into the dropdown
//     function loadEnvelopes() {
//         const envelopeDropdown = document.getElementById('editEnvelope');
//         const monthlyEnvelopes = JSON.parse(localStorage.getItem('monthlyEnvelopes')) || [];
//         const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

//         envelopeDropdown.innerHTML = ''; // Clear any existing options

//         // Create options for monthly envelopes
//         monthlyEnvelopes.forEach(envelope => {
//             const option = document.createElement('option');
//             option.value = envelope.name;
//             option.textContent = `${envelope.name} (Monthly)`;
//             envelopeDropdown.appendChild(option);
//         });

//         // Create options for annual envelopes
//         annualEnvelopes.forEach(envelope => {
//             const option = document.createElement('option');
//             option.value = envelope.name;
//             option.textContent = `${envelope.name} (Annual)`;
//             envelopeDropdown.appendChild(option);
//         });
//     }

//     // Function to load accounts from localStorage
//     function loadAccounts() {
//         const accountSelect = document.getElementById('editAccount');
//         const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

//         accountSelect.innerHTML = ''; // Clear existing options

//         accounts.forEach(account => {
//             const option = document.createElement('option');
//             option.value = account.title; // Ensure value is the title for proper linking
//             option.textContent = `${account.title} - $${account.amount || 0}`;
//             accountSelect.appendChild(option);
//         });
//     }

//     // Populate form when a transaction is selected
//     transactionSelect.addEventListener('change', function () {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//         const selectedTransaction = transactions[this.value];

//         if (selectedTransaction) {
//             document.getElementById('editTitle').value = selectedTransaction.title;
//             document.getElementById('editDate').value = selectedTransaction.date;
//             document.getElementById('editAmount').value = selectedTransaction.amount;
//             document.getElementById('editEnvelope').value = selectedTransaction.envelope;
//             document.getElementById('editAccount').value = selectedTransaction.account;
//             document.getElementById('editNotes').value = selectedTransaction.notes;
//         }
//     });

//     // Save changes to the selected transaction
//     document.getElementById('save-btn').addEventListener('click', function () {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//         const selectedIndex = transactionSelect.value;

//         if (selectedIndex !== '') {
//             transactions[selectedIndex] = {
//                 title: document.getElementById('editTitle').value,
//                 date: document.getElementById('editDate').value,
//                 amount: parseFloat(document.getElementById('editAmount').value),
//                 envelope: document.getElementById('editEnvelope').value,
//                 account: document.getElementById('editAccount').value,
//                 notes: document.getElementById('editNotes').value
//             };

//             localStorage.setItem('transactions', JSON.stringify(transactions));
//             alert('Transaction updated successfully!');
//             loadTransactions(); // Reload the transactions in the dropdown
//         } else {
//             alert('Please select a transaction to edit.');
//         }
//     });

//     // Delete the selected transaction
//     document.getElementById('delete-btn').addEventListener('click', function () {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//         const selectedIndex = transactionSelect.value;

//         if (selectedIndex !== '') {
//             transactions.splice(selectedIndex, 1);
//             localStorage.setItem('transactions', JSON.stringify(transactions));
//             alert('Transaction deleted successfully!');
//             loadTransactions(); // Reload the transactions in the dropdown
//             document.getElementById('editTransactionForm').reset();
//         } else {
//             alert('Please select a transaction to delete.');
//         }
//     });
// });



// Function to close the modal and clear the iframe
function closeModal() {
    const modal = window.parent.document.getElementById('myModal');
    const iframe = window.parent.document.getElementById('externalPage');

    if (modal) {
        modal.style.display = "none";
    }

    if (iframe) {
        iframe.src = "";
    }
}

// Helper function to navigate home
function goHome() {
    closeModal();
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const transactionSelect = document.getElementById('transactionSelect');
    const editForm = {
        title: document.getElementById('editTitle'),
        date: document.getElementById('editDate'),
        amount: document.getElementById('editAmount'),
        envelope: document.getElementById('editEnvelope'),
        account: document.getElementById('editAccount'),
        notes: document.getElementById('editNotes'),
    };

    loadAccounts();
    loadEnvelopes();
    loadTransactions();

    // Helper function to get query parameter
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Function to load transactions into the dropdown
    function loadTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactionSelect.innerHTML = '<option value="">Select a transaction</option>';

        transactions.forEach((transaction, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${transaction.title} - $${transaction.amount}`;
            transactionSelect.appendChild(option);
        });

        // Check if an ID is passed in the URL
        const transactionId = getQueryParam('id');
        if (transactionId) {
            const transaction = transactions[transactionId];
            if (transaction) {
                populateForm(transaction);
            }
        }
    }

    // Function to populate form with transaction data
    function populateForm(transaction) {
        editForm.title.value = transaction.title || '';
        editForm.date.value = transaction.date || '';
        editForm.amount.value = transaction.amount || '';
        editForm.envelope.value = transaction.envelope || '';
        editForm.account.value = transaction.account || '';
        editForm.notes.value = transaction.notes || '';
    }

    // Function to load envelopes into the dropdown
    function loadEnvelopes() {
        const envelopeDropdown = document.getElementById('editEnvelope');
        const monthlyEnvelopes = JSON.parse(localStorage.getItem('monthlyEnvelopes')) || [];
        const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

        envelopeDropdown.innerHTML = '';

        monthlyEnvelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.name;
            option.textContent = `${envelope.name} (Monthly)`;
            envelopeDropdown.appendChild(option);
        });

        annualEnvelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.name;
            option.textContent = `${envelope.name} (Annual)`;
            envelopeDropdown.appendChild(option);
        });
    }

    // Function to load accounts into the dropdown
    function loadAccounts() {
        const accountSelect = document.getElementById('editAccount');
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        accountSelect.innerHTML = '';

        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.title;
            option.textContent = `${account.title} - $${account.amount || 0}`;
            accountSelect.appendChild(option);
        });
    }

    // Handle dropdown selection
    transactionSelect.addEventListener('change', function () {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedTransaction = transactions[this.value];

        if (selectedTransaction) {
            populateForm(selectedTransaction);
        }
    });

    // Save changes
    document.getElementById('save-btn').addEventListener('click', function () {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedIndex = transactionSelect.value;

        if (selectedIndex !== '') {
            transactions[selectedIndex] = {
                title: editForm.title.value,
                date: editForm.date.value,
                amount: parseFloat(editForm.amount.value),
                envelope: editForm.envelope.value,
                account: editForm.account.value,
                notes: editForm.notes.value,
            };

            localStorage.setItem('transactions', JSON.stringify(transactions));
            alert('Transaction updated successfully!');
            loadTransactions();
        } else {
            alert('Please select a transaction to edit.');
        }
    });

    // Delete the selected transaction
    document.getElementById('delete-btn').addEventListener('click', function () {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedIndex = transactionSelect.value;

        if (selectedIndex !== '') {
            transactions.splice(selectedIndex, 1);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            alert('Transaction deleted successfully!');
            loadTransactions();
            document.getElementById('editTransactionForm').reset();
        } else {
            alert('Please select a transaction to delete.');
        }
    });
});
