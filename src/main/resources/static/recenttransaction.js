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
    const noResultsMessage = document.createElement('tr');

    // Format date as MM/DD/YY
    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${month}/${day}/${year}`;
    }

    // Create a table row for a transaction or income
    function createTableRow(entry) {
        const row = document.createElement('tr');

        // Create a clickable link for the title
        const titleLink = document.createElement('a');
        titleLink.textContent = entry.title || entry.accountTitle || "Income";
        titleLink.href = `edittransaction.html?id=${entry.id || entry.date}`; // Use `date` as fallback ID for incomes
        titleLink.style.color = 'black';
        titleLink.style.textDecoration = 'none';
        titleLink.style.cursor = 'pointer';

        // Add hover effects for the title link
        titleLink.addEventListener('mouseenter', () => {
            titleLink.style.color = 'blue';
            titleLink.style.textDecoration = 'underline';
        });
        titleLink.addEventListener('mouseleave', () => {
            titleLink.style.color = 'black';
            titleLink.style.textDecoration = 'none';
        });

        // Populate the table row
        row.innerHTML = `
            <td></td> <!-- Placeholder for title link -->
            <td>${formatDate(entry.date)}</td>
            <td>$${entry.amount.toFixed(2)}</td>
            <td>${entry.envelope || "N/A"}</td>
        `;
        row.firstElementChild.appendChild(titleLink); // Add link to the first cell
        return row;
    }

    // Display all transactions and incomes with optional search query
    function loadTransactionsAndIncomes(searchQuery = "") {
        // Retrieve transactions and incomes from localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];

        // Combine and sort entries by date (descending)
        const allEntries = [...transactions, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Clear the table
        tableBody.innerHTML = '';
        let hasResults = false;

        // Populate the table with matching entries
        allEntries.forEach(entry => {
            const entryTitle = entry.title || entry.accountTitle || "Income";
            if (
                searchQuery === "" || 
                entryTitle.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                hasResults = true;
                tableBody.appendChild(createTableRow(entry));
            }
        });

        // Display "Transaction not found" message if no results match
        if (!hasResults) {
            noResultsMessage.innerHTML = `<td colspan="4" style="text-align: center;">Transaction not found</td>`;
            tableBody.appendChild(noResultsMessage);
        }
    }

    // Event listeners for search functionality
    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value.trim();
        loadTransactionsAndIncomes(searchQuery);
    });

    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const searchQuery = searchInput.value.trim();
            loadTransactionsAndIncomes(searchQuery);
        }
    });

    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === "") {
            loadTransactionsAndIncomes();
        }
    });

    // Navigate back to the home page
    function goHome() {
        window.location.href = 'index.html'; // Redirect to the home page
    }

    // Add event listener for the back button
    document.getElementById('backButton').addEventListener('click', goHome);

    // Initialize the table on page load
    loadTransactionsAndIncomes();
});

