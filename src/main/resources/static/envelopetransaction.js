// // envelope-transactions.js
// document.addEventListener('DOMContentLoaded', () => {
//     const transactionList = document.getElementById('envelope-transaction-list');
//     const envelopeTitle = document.getElementById('envelope-title');

//     // Simulate selected envelope (replace this with actual linking logic later)
//     const selectedEnvelope = localStorage.getItem('selectedEnvelope') || 'Groceries';

//     envelopeTitle.textContent = `Transactions for: ${selectedEnvelope}`;

//     // Load transactions for the selected envelope
//     function loadEnvelopeTransactions() {
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

//         // Filter transactions by the selected envelope
//         const filteredTransactions = transactions.filter(
//             transaction => transaction.envelope === selectedEnvelope
//         );

//         // Sort by date (newest first)
//         filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

//         transactionList.innerHTML = ''; // Clear existing items

//         filteredTransactions.forEach(transaction => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `${transaction.date} - ${transaction.title} - $${transaction.amount}`;
//             transactionList.appendChild(listItem);
//         });
//     }

//     // Initialize the transaction list for the envelope
//     loadEnvelopeTransactions();
// });


document.addEventListener('DOMContentLoaded', function () {
    const envelopeContainer = document.getElementById('envelopeContainer'); // Container for envelopes
    const transactionList = document.getElementById('transactionList'); // Area to list transactions

    // Function to load and display envelopes
    function loadEnvelopes() {
        const monthlyEnvelopes = JSON.parse(localStorage.getItem('monthlyEnvelopes')) || [];
        const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

        envelopeContainer.innerHTML = ''; // Clear any existing content

        [...monthlyEnvelopes, ...annualEnvelopes].forEach(envelope => {
            const envelopeCard = document.createElement('div');
            envelopeCard.classList.add('envelope-card'); // Add envelope styling class
            envelopeCard.dataset.envelopeName = envelope.name; // Store envelope name in data attribute
            envelopeCard.innerHTML = `
                <h3>${envelope.name}</h3>
                <p>${envelope.type || (monthlyEnvelopes.includes(envelope) ? 'Monthly' : 'Annual')}</p>
            `;
            envelopeContainer.appendChild(envelopeCard);
        });
    }

    // Function to load and display transactions for the selected envelope
    function loadTransactionsForEnvelope(envelopeName) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Filter transactions by envelope
        const filteredTransactions = transactions.filter(txn => txn.envelope === envelopeName);

        // Clear previous transaction list
        transactionList.innerHTML = '';

        if (filteredTransactions.length > 0) {
            filteredTransactions.forEach(transaction => {
                const transactionItem = document.createElement('div');
                transactionItem.classList.add('transaction-item'); // Add styling class for transaction layout
                transactionItem.innerHTML = `
                    <h4>${transaction.title}</h4>
                    <p>Date: ${transaction.date}</p>
                    <p>Amount: $${transaction.amount.toFixed(2)}</p>
                    <p>Account: ${transaction.account || 'N/A'}</p>
                    <p>Notes: ${transaction.notes || 'None'}</p>
                `;
                transactionList.appendChild(transactionItem);
            });
        } else {
            // Message if no transactions found
            transactionList.innerHTML = '<p>No transactions found for this envelope.</p>';
        }
    }

    // Event listener for envelope clicks
    envelopeContainer.addEventListener('click', function (event) {
        if (event.target.closest('.envelope-card')) {
            const envelopeCard = event.target.closest('.envelope-card');
            const envelopeName = envelopeCard.dataset.envelopeName;

            // Load transactions for the selected envelope
            loadTransactionsForEnvelope(envelopeName);
        }
    });

    // Initial loading of envelopes
    loadEnvelopes();
});
