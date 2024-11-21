// Function to close the modal and clear the iframe (useful in live server)
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

// Helper function to navigate home
function goHome() {
    closeModal(); // Close the modal and clear iframe
    window.location.href = 'index.html'; // Navigate to home page
}

// Initialize the page and load dropdowns/lists
document.addEventListener('DOMContentLoaded', async function () {
    const transactionTab = document.getElementById('transactionTab');
    const incomeTab = document.getElementById('incomeTab');
    const transactionForm = document.getElementById('transactionForm');
    const incomeForm = document.getElementById('incomeForm');
    const accountDropdown = document.getElementById('account-dropdown');
    const envelopeDropdown = document.getElementById('envelope-dropdown');
    const transactionList = document.getElementById('transactionList');

    // Load accounts, envelopes, and transactions
    await loadAccounts();
    await loadEnvelopes();
    await loadTransactions();

    // Handle tab switching between transaction and income
    transactionTab.onclick = function () {
        transactionForm.style.display = 'block';
        incomeForm.style.display = 'none';
        transactionTab.classList.add('active');
        incomeTab.classList.remove('active');
        document.getElementById('formTitle').textContent = 'Add Transaction';
        transactionList.style.display = 'block';
    };

    incomeTab.onclick = function () {
        transactionForm.style.display = 'none';
        incomeForm.style.display = 'block';
        transactionTab.classList.remove('active');
        incomeTab.classList.add('active');
        document.getElementById('formTitle').textContent = 'Add Income';
        transactionList.style.display = 'none';
    };

    // Load envelopes from the backend
    async function loadEnvelopes() {
        try {
            const response = await fetch('/envelopes/userEnvelopes');
            if (!response.ok) {
                throw new Error('Failed to fetch envelopes');
            }

            const envelopes = await response.json();
            envelopeDropdown.innerHTML = '<option value="">Select an envelope</option>';

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

    // Load accounts from the backend
    async function loadAccounts() {
        try {
            const response = await fetch('/accounts');
            if (!response.ok) {
                throw new Error('Failed to fetch accounts');
            }

            const accounts = await response.json();
            accountDropdown.innerHTML = '<option value="">Select an account</option>';

            accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                accountDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading accounts:', error);
        }
    }

    // Load transactions from the backend
    async function loadTransactions() {
        try {
            const response = await fetch('/transactions');
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }

            const transactions = await response.json();
            transactionList.innerHTML = ''; // Clear the current list

            transactions.forEach(transaction => {
                const listItem = document.createElement('li');
                listItem.textContent = `${transaction.title} - $${transaction.amount} on ${transaction.date}`;
                transactionList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error loading transactions:', error);
        }
    }

    // Add a transaction
    document.getElementById('addTransactionBtn').onclick = async function () {
        const transaction = {
            title: document.getElementById('title').value.trim(),
            date: document.getElementById('date').value,
            amount: parseFloat(document.getElementById('amount').value),
            envelope: { id: document.getElementById('envelope-dropdown').value },
            account: { id: document.getElementById('account-dropdown').value },
            notes: document.getElementById('notes').value || null,
        };

        // Validate inputs
        if (!transaction.title || !transaction.date || isNaN(transaction.amount)) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction),
            });

            if (response.ok) {
                alert('Transaction added successfully!');
                document.getElementById('transactionForm').reset();
                await loadTransactions(); // Reload transactions
            } else {
                const error = await response.json();
                console.error('Error adding transaction:', error);
                alert(`Failed to add transaction: ${error.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            alert('Failed to add transaction. Please check your connection and try again.');
        }
    };
});



document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'openModal'
    const modalButtons = document.querySelectorAll(".openModal");
    const modal = document.getElementById("myModal");
    const iframe = document.getElementById("externalPage");
    const closeBtn = document.querySelector(".close-btn");

    // Attach click event to each button
    modalButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the URL from the button's data attribute
            const pageUrl = this.getAttribute("data-url");

            // Set the iframe's src to the selected page
            iframe.src = pageUrl;

            // Show the modal
            modal.style.display = "flex";
        });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
        iframe.src = ""; // Clear the iframe's src when closing the modal
    });

    // Optionally close the modal when clicking outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            iframe.src = ""; // Clear the iframe's src
        }
    });
});