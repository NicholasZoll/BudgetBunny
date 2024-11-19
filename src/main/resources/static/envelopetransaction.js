// envelope-transactions.js
document.addEventListener('DOMContentLoaded', () => {
    const transactionList = document.getElementById('envelope-transaction-list');
    const envelopeTitle = document.getElementById('envelope-title');

    // Simulate selected envelope (replace this with actual linking logic later)
    const selectedEnvelope = localStorage.getItem('selectedEnvelope') || 'Groceries';

    envelopeTitle.textContent = `Transactions for: ${selectedEnvelope}`;

    // Load transactions for the selected envelope
    function loadEnvelopeTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Filter transactions by the selected envelope
        const filteredTransactions = transactions.filter(
            transaction => transaction.envelope === selectedEnvelope
        );

        // Sort by date (newest first)
        filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        transactionList.innerHTML = ''; // Clear existing items

        filteredTransactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.date} - ${transaction.title} - $${transaction.amount}`;
            transactionList.appendChild(listItem);
        });
    }

    // Initialize the transaction list for the envelope
    loadEnvelopeTransactions();
});
