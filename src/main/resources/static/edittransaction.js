
// Helper function to navigate home
function goHome() {
    window.location.href = 'index.html'; // Replace with your home page URL
}

document.addEventListener('DOMContentLoaded', function () {
    const transactionSelect = document.getElementById('transactionSelect');

    // Load accounts and envelopes
    loadAccounts();
    loadEnvelopes();
    loadTransactions(); // Load transactions into the dropdown

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
    }

    // Function to load envelopes into the dropdown
    function loadEnvelopes() {
        const envelopeDropdown = document.getElementById('editEnvelope');
        const monthlyEnvelopes = JSON.parse(localStorage.getItem('monthlyEnvelopes')) || [];
        const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

        envelopeDropdown.innerHTML = ''; // Clear any existing options

        // Create options for monthly envelopes
        monthlyEnvelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.name;
            option.textContent = `${envelope.name} (Monthly)`;
            envelopeDropdown.appendChild(option);
        });

        // Create options for annual envelopes
        annualEnvelopes.forEach(envelope => {
            const option = document.createElement('option');
            option.value = envelope.name;
            option.textContent = `${envelope.name} (Annual)`;
            envelopeDropdown.appendChild(option);
        });
    }

    // Function to load accounts from localStorage
    function loadAccounts() {
        const accountSelect = document.getElementById('editAccount');
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

        accountSelect.innerHTML = ''; // Clear existing options

        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.title; // Ensure value is the title for proper linking
            option.textContent = `${account.title} - $${account.amount || 0}`;
            accountSelect.appendChild(option);
        });
    }

    // Populate form when a transaction is selected
    transactionSelect.addEventListener('change', function () {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedTransaction = transactions[this.value];

        if (selectedTransaction) {
            document.getElementById('editTitle').value = selectedTransaction.title;
            document.getElementById('editDate').value = selectedTransaction.date;
            document.getElementById('editAmount').value = selectedTransaction.amount;
            document.getElementById('editEnvelope').value = selectedTransaction.envelope;
            document.getElementById('editAccount').value = selectedTransaction.account;
            document.getElementById('editNotes').value = selectedTransaction.notes;
        }
    });

    // Save changes to the selected transaction
    document.getElementById('save-btn').addEventListener('click', function () {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const selectedIndex = transactionSelect.value;

        if (selectedIndex !== '') {
            transactions[selectedIndex] = {
                title: document.getElementById('editTitle').value,
                date: document.getElementById('editDate').value,
                amount: parseFloat(document.getElementById('editAmount').value),
                envelope: document.getElementById('editEnvelope').value,
                account: document.getElementById('editAccount').value,
                notes: document.getElementById('editNotes').value
            };

            localStorage.setItem('transactions', JSON.stringify(transactions));
            alert('Transaction updated successfully!');
            loadTransactions(); // Reload the transactions in the dropdown
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
            loadTransactions(); // Reload the transactions in the dropdown
            document.getElementById('editTransactionForm').reset();
        } else {
            alert('Please select a transaction to delete.');
        }
    });
});

