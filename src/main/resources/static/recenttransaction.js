


    console.log('document loaded');

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
                    <td>${entry.notes || ""}</td>

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
        loadRecentTransactions(searchQuery);
    });

    // Trigger search on pressing 'Enter' key
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of Enter key
            const searchQuery = searchInput.value.trim();
            loadRecentTransactions(searchQuery);
        }
    });

    // Reset the table when the search bar is cleared
    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === "") {
            loadRecentTransactions();
        }
    });



    async function loadRecentTransactions(searchQuery = "") {
        try {
            const response = await fetch('/transactions/userTransactions');
            if (!response.ok) {
                console.error('Failed to fetch transactions.');
                return;
            }
            console.log('response', response);
    
            const transactions = await response.json();
            const tableBody = document.getElementById('transactionTableBody');
            tableBody.innerHTML = ''; // Clear existing rows
            console.log('transactions', transactions);
    
            // **Filter transactions based on the search query**
            const filteredTransactions = transactions.filter(transaction =>
                searchQuery === "" ||
                transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
    
            // **Check if there are no matching transactions**
            if (filteredTransactions.length === 0) { 
                // **Added: Display message when no transactions match the search query**
                const noResultsRow = document.createElement('tr');
                noResultsRow.innerHTML = `<td colspan="5" style="text-align: center;">This transaction doesn't exist.</td>`;
                tableBody.appendChild(noResultsRow); // **Added: Append the "no results" row to the table**
            } else {
                // **Render filtered transactions if matches are found**
                filteredTransactions.forEach(transaction => {
                    const date = new Date(transaction.date);
                    // Format date as "MM/DD/YYYY"
                    const formatter = new Intl.DateTimeFormat('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                    });
                    const formattedDate = formatter.format(date);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.title}</td>
                        <td>${formattedDate}</td>
                        <td>${transaction.amount < 0 ? '+' : ''}$${Math.abs(transaction.amount)}</td>
                        <td>${transaction.envelope ? transaction.envelope.name : 'N/A'}</td>
                        <td>${transaction.notes ? transaction.notes : 'N/A'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error loading recent transactions:', error);
        }
    }
    
    
    // Load transactions on page load
    loadRecentTransactions();

    // Search functionality
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        loadRecentTransactions(query);
    });

    // Initialize the table on page load
    //loadTransactionsAndIncomes();
