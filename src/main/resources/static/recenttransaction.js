


    console.log('document loaded');

    const tableBody = document.getElementById('transactionTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const envelopeDropdown = document.getElementById('envelopeDropdown'); // Added reference to dropdown
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
            const selectedEnvelope = envelopeDropdown.value;
            loadRecentTransactions(searchQuery, selectedEnvelope);
        }
    });

    // Reset the table when the search bar is cleared
    searchInput.addEventListener('input', function () {
        if (searchInput.value.trim() === "") {
            const selectedEnvelope = envelopeDropdown.value;
            loadRecentTransactions("", selectedEnvelope);
        }
    });

    envelopeDropdown.addEventListener('change', function () {
        const selectedEnvelope = envelopeDropdown.value;
        const searchQuery = searchInput.value.trim();
        loadRecentTransactions(searchQuery, selectedEnvelope);
    });



    async function loadRecentTransactions(searchQuery = "", selectedEnvelope = "") {
        try {
            const response = await fetch('/transactions/userTransactions');
            if (!response.ok) {
                console.error('Failed to fetch transactions.');
                return;
            }
    
            const transactions = await response.json();
            console.log('Fetched Transactions:', transactions);
    
            tableBody.innerHTML = ''; // Clear existing rows
    
            // Populate the dropdown on initial load
            if (!envelopeDropdown.hasAttribute('data-initialized')) {
                populateEnvelopeDropdown(transactions);
                envelopeDropdown.setAttribute('data-initialized', 'true'); // Mark dropdown as initialized
            }
    
            // Filter transactions based on search query and selected envelope
            let filteredTransactions = transactions.filter(transaction =>
                (searchQuery === "" || transaction.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (selectedEnvelope === "" || transaction.envelope?.name === selectedEnvelope)
            );
    
            // Check if there are no matching transactions
            if (filteredTransactions.length === 0) {
                const noResultsRow = document.createElement('tr');
                noResultsRow.innerHTML = `<td colspan="5" style="text-align: center;">No transactions found.</td>`;
                tableBody.appendChild(noResultsRow);
            } else {
                // Render filtered transactions
                filteredTransactions.forEach(transaction => {
                    const date = new Date(transaction.date);
                    const formattedDate = formatDate(transaction.date);
    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.title}</td>
                        <td>${formattedDate}</td>
                        <td>${transaction.amount < 0 ? '+' : ''}$${Math.abs(transaction.amount)}</td>
                        <td>${transaction.envelope ? transaction.envelope.name : 'N/A'}</td>
                        <td>${transaction.notes || 'N/A'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error loading recent transactions:', error);
        }
    }
    
    

    
    
    loadRecentTransactions();

    // Search functionality
    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value.trim();
        const selectedEnvelope = envelopeDropdown.value;
        loadRecentTransactions(searchQuery, selectedEnvelope);
    });

    // Initialize the table on page load
    //loadTransactionsAndIncomes();




    function populateEnvelopeDropdown(transactions) {
        const uniqueEnvelopes = Array.from(
            new Set(transactions.map(transaction => transaction.envelope?.name || "N/A"))
        );
    
        console.log('Unique Envelopes:', uniqueEnvelopes); // Debugging envelope population
    
        envelopeDropdown.innerHTML = '<option value="">All Envelopes</option>'; // Reset dropdown options
        uniqueEnvelopes.forEach(envelope => {
            if (envelope !== "N/A") { // Optionally exclude "N/A" if desired
                const option = document.createElement('option');
                option.value = envelope;
                option.textContent = envelope;
                envelopeDropdown.appendChild(option);
            }
        });
    }
    
    

    let filteredTransactions = transactions.filter(transaction =>
        (searchQuery === "" || transaction.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedEnvelope === "" || transaction.envelope?.name === selectedEnvelope)
    );
    


    
    