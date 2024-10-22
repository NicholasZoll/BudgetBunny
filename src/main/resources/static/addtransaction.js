// Helper function to navigate home
function goHome() {
    window.location.href = 'index.html'; // Replace with your home page URL
}

document.addEventListener('DOMContentLoaded', function () {
    const transactionTab = document.getElementById('transactionTab');
    const incomeTab = document.getElementById('incomeTab');
    const transactionForm = document.getElementById('transactionForm');
    const incomeForm = document.getElementById('incomeForm');
    const accountDropdown = document.getElementById('account-dropdown');
    const envelopeDropdown = document.getElementById('envelope-dropdown');
    const transactionList = document.getElementById('transactionList');
    const incomeList = document.getElementById('incomeList'); // Income list
    const addedIncomesTitle = document.getElementById('addedIncomesTitle'); // Title for added incomes

    // Load accounts and envelopes
    loadAccounts();
    loadEnvelopes();
    loadTransactions();
    loadIncomes(); // Load incomes on initial load

    // Show the appropriate form based on the tab selected
    transactionTab.onclick = function () {
        transactionForm.style.display = 'block';
        incomeForm.style.display = 'none';
        transactionTab.classList.add('active');
        incomeTab.classList.remove('active');
        document.getElementById('formTitle').textContent = 'Add Transaction'; // Update title
        document.querySelector('h2').style.display = 'block'; // Show "Added Transactions" title
        transactionList.style.display = 'block'; // Show transaction list
        addedIncomesTitle.style.display = 'none'; // Hide incomes title
        incomeList.style.display = 'none'; // Hide income list
    };

    incomeTab.onclick = function () {
        transactionForm.style.display = 'none';
        incomeForm.style.display = 'block';
        transactionTab.classList.remove('active');
        incomeTab.classList.add('active');
        document.getElementById('formTitle').textContent = 'Add Income'; // Update title
        // Hide transaction section when income tab is active
        document.querySelector('h2').style.display = 'none'; // Hide "Added Transactions" title
        transactionList.style.display = 'none'; // Hide transaction list
        addedIncomesTitle.style.display = 'block'; // Show incomes title
        incomeList.style.display = 'block'; // Show income list
        loadIncomes(); // Load incomes when income tab is clicked
    };

    // Load envelopes into the dropdown
    function loadEnvelopes() {
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

    // Load accounts from localStorage
    function loadAccounts() {
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        accountDropdown.innerHTML = ''; // Clear existing options

        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.title; // Ensure value is the title for proper linking
            option.textContent = `${account.title} - $${account.amount || 0}`;
            accountDropdown.appendChild(option);
        });
    }

    // Load transactions and display them
    function loadTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactionList.innerHTML = ''; // Clear the current list

        transactions.forEach(transaction => {
            const listItem = document.createElement('li');
            listItem.textContent = `${transaction.title} - $${transaction.amount} on ${transaction.date}`;
            transactionList.appendChild(listItem);
        });
    }

// Load incomes and display them
function loadIncomes() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || []; // Load incomes
    incomeList.innerHTML = ''; // Clear the current list

    // Sort the incomes array by date (newest first)
    incomes.sort((a, b) => new Date(b.date) - new Date(a.date));

    incomes.forEach(income => {
        const listItem = document.createElement('li');
        listItem.textContent = `${income.date} - ${income.accountTitle} - $${income.amount} - Notes: ${income.notes}`;
        incomeList.appendChild(listItem);
    });
}


    // Add event listener for adding a transaction
    document.getElementById('addTransactionBtn').onclick = function () {
        const transaction = {
            title: document.getElementById('title').value,
            date: document.getElementById('date').value,
            amount: parseFloat(document.getElementById('amount').value),
            envelope: envelopeDropdown.value,
            account: accountDropdown.value,
            notes: document.getElementById('notes').value
        };

        // Save transaction to localStorage
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        alert('Transaction added successfully!');
        document.getElementById('transactionForm').reset();
        loadTransactions(); // Refresh the transaction list
    };

    // Add event listener for saving income
    document.getElementById('saveIncomeBtn').onclick = function () {
        const income = {
            date: document.getElementById('incomeDate').value,
            accountTitle: document.getElementById('accountTitle').value,
            amount: parseFloat(document.getElementById('incomeAmount').value),
            notes: document.getElementById('incomeNotes').value
        };

        // Save income to localStorage
        const incomes = JSON.parse(localStorage.getItem('incomes')) || []; // Load incomes
        incomes.push(income); // Add new income
        localStorage.setItem('incomes', JSON.stringify(incomes)); // Save back to localStorage

        alert('Income saved successfully!');
        document.getElementById('incomeForm').reset();
        loadAccounts(); // Refresh the accounts dropdown
        loadIncomes(); // Refresh the income list
    };

        // Add event listener for saving income
    document.getElementById('saveIncomeBtn').onclick = function () {
        const income = {
            date: document.getElementById('incomeDate').value,
            accountTitle: document.getElementById('accountTitle').value,
            amount: parseFloat(document.getElementById('incomeAmount').value),
            notes: document.getElementById('incomeNotes').value
        };

        // Save income to localStorage
        const incomeAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const existingAccountIndex = incomeAccounts.findIndex(account => account.title === income.accountTitle);

        if (existingAccountIndex !== -1) {
            // If the account already exists, add the income amount to it
            incomeAccounts[existingAccountIndex].amount += income.amount;
        } else {
            // If the account doesn't exist, create a new one
            incomeAccounts.push({ title: income.accountTitle, amount: income.amount });
        }

        // Save the updated accounts back to localStorage
        localStorage.setItem('accounts', JSON.stringify(incomeAccounts));

        // Save income in localStorage
        const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
        incomes.push(income);
        localStorage.setItem('incomes', JSON.stringify(incomes));

        alert('Income saved successfully!');
        document.getElementById('incomeForm').reset();
        loadAccounts(); // Refresh the accounts dropdown
        loadIncomes(); // Refresh the incomes list
    };
});


