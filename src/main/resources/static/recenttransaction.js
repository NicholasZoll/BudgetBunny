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
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const noResultsMessage = document.createElement('tr'); // Message for no results

    // Function to format date as MM/DD/YY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2); // Last two digits of the year
        return `${month}/${day}/${year}`;
    }

    // Load transactions and incomes, and filter by search query
    function loadTransactionsAndIncomes(searchQuery = "") {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        
        // Combine transactions and incomes into a single array
        const allEntries = [...transactions, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Log for debugging
        console.log("Transactions:", transactions);
        console.log("Incomes:", incomes);
        
        // Clear existing rows
        tableBody.innerHTML = '';

        let hasResults = false; // Flag to track if there are matching results

        allEntries.forEach(entry => {
            let entryTitle = entry.title || entry.accountTitle || "Income"; // Ensure we are checking both title (transactions) and accountTitle (incomes)

            console.log("Entry Title:", entryTitle); // Log the title for debugging
            
            // Search based on title (for transactions) or accountTitle (for incomes)
            if (
                searchQuery === "" ||
                entryTitle.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                hasResults = true;
                const row = document.createElement('tr');
    
                // Create clickable title link
                const titleLink = document.createElement('a');
                titleLink.textContent = entryTitle;
                titleLink.href = `edittransaction.html?id=${entry.id || entry.date}`; // Use date as fallback ID for incomes
                titleLink.style.color = 'black';
                titleLink.style.textDecoration = 'none';
                titleLink.style.cursor = 'pointer';
    
                // Add hover effects
                titleLink.addEventListener('mouseenter', () => {
                    titleLink.style.color = 'blue';
                    titleLink.style.textDecoration = 'underline';
                });
                titleLink.addEventListener('mouseleave', () => {
                    titleLink.style.color = 'black';
                    titleLink.style.textDecoration = 'none';
                });
    
                // Add the row to the table
                row.innerHTML = `
                    <td></td> <!-- Placeholder for title link -->
                    <td>${formatDate(entry.date)}</td>
                    <td>$${entry.amount}</td>
                    <td>${entry.envelope || ""}</td>
                `;
                row.firstElementChild.appendChild(titleLink); // Add the link to the title cell
                tableBody.appendChild(row);
            }
        });

        // Show "Transaction not found" if no matching entries
        if (!hasResults) {
            noResultsMessage.innerHTML = `<td colspan="4" style="text-align: center;">Transaction not found</td>`;
            tableBody.appendChild(noResultsMessage);
        }
    }

    // Add event listener to the search button
    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value.trim();
        loadTransactionsAndIncomes(searchQuery);
    });

    // Trigger search on pressing 'Enter' key
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of Enter key
            const searchQuery = searchInput.value.trim();
            loadTransactionsAndIncomes(searchQuery);
        }
    });

    // Reset the table when the search bar is cleared
    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === "") {
            loadTransactionsAndIncomes();
        }
    });



    async function loadRecentTransactions(searchQuery = "") {
        try {
            const response = await fetch('/transactions/userTransactions');
            if (!response.ok) {
                console.error('Failed to fetch transactions.');
                return;
            }
    
            const transactions = await response.json();
            const tableBody = document.getElementById('transactionTableBody');
            tableBody.innerHTML = ''; // Clear existing rows
    
            transactions
                .filter(transaction =>
                    searchQuery === "" ||
                    transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.title}</td>
                        <td>${new Date(transaction.date).toLocaleDateString()}</td>
                        <td>$${transaction.amount}</td>
                        <td>${transaction.envelope ? transaction.envelope.name : 'N/A'}</td>
                    `;
                    tableBody.appendChild(row);
                });
    
            if (transactions.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = `<td colspan="4" style="text-align: center;">No transactions found</td>`;
                tableBody.appendChild(noDataRow);
            }
        } catch (error) {
            console.error('Error loading recent transactions:', error);
        }
    }
    
    // Load transactions on page load
    document.addEventListener('DOMContentLoaded', () => {
        loadRecentTransactions();
    
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            loadRecentTransactions(query);
        });
    });
    



    // Initialize the table on page load
    loadTransactionsAndIncomes();
});
