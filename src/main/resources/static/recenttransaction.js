// // Load transactions and incomes from localStorage
// document.addEventListener('DOMContentLoaded', function () {
//     const tableBody = document.getElementById('transactionTableBody');

//     function loadTransactionsAndIncomes() {
//         // Retrieve data from localStorage
//         const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
//         const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

//         // Merge transactions and incomes for display
//         const allEntries = [...transactions, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

//         // Populate the table
//         tableBody.innerHTML = ''; // Clear existing rows
//         allEntries.forEach(entry => {
//             const row = document.createElement('tr');

//             // Transaction/Income Details
//             row.innerHTML = `
//                 <td>${entry.title || 'Income'}</td>
//                 <td>${entry.date}</td>
//                 <td>$${entry.amount.toFixed(2)}</td>
//                 <td>${entry.envelope || 'N/A'}</td>
//             `;

//             tableBody.appendChild(row);
//         });
//     }

//     loadTransactionsAndIncomes(); // Load data when the page is loaded
// });

// // Navigate back to the home page
// function goHome() {
//     window.location.href = 'index.html';
// }




document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('transactionTableBody');

    function loadTransactionsAndIncomes() {
        // Retrieve transactions and incomes from localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

        // Log to confirm data retrieval
        console.log('Transactions:', transactions);
        console.log('Incomes:', incomes);

        // Combine transactions and incomes
        const allEntries = [
            ...transactions.map(transaction => ({
                type: 'Transaction',
                title: transaction.title || 'Untitled Transaction',
                date: transaction.date || 'N/A',
                amount: transaction.amount || 0,
                envelope: transaction.envelope || 'N/A',
            })),
            ...incomes.map(income => ({
                type: 'Income',
                title: income.accountTitle || 'Income',
                date: income.date || 'N/A',
                amount: income.amount || 0,
                envelope: 'N/A',
            }))
        ];

        // Log combined data before sorting to check all entries
        console.log('All Entries Before Sorting:', allEntries);

        // Sort by date (most recent first)
        allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Log sorted data to check order
        console.log('All Entries After Sorting:', allEntries);

        // Clear the table before populating
        tableBody.innerHTML = '';

        // Populate the table with transactions and incomes
        allEntries.forEach(entry => {
            const row = document.createElement('tr');

            // Create a row for each entry (transaction or income)
            row.innerHTML = `
                <td>${entry.title}</td>
                <td>${entry.date}</td>
                <td>$${entry.amount.toFixed(2)}</td>
                <td>${entry.envelope}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    loadTransactionsAndIncomes(); // Call function to load the data

});

// Navigate back to the home page
function goHome() {
    window.location.href = 'index.html';
}
