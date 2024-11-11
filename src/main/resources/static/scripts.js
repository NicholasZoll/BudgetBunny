// Function to update Card 2 content based on selected tab
function updateCard2(contentType) {
    const card2Content = document.querySelector('.card-2-content');
    const card3Content = document.querySelector('.card-3-content');
    const tabs = document.querySelectorAll('.tab-btn');

    // Update the active tab button
    tabs.forEach(tab => tab.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Change content in Card 2 based on the selected tab
    if (contentType === 'envelopes') {
        card2Content.innerHTML = `
            <h3>Envelopes</h3>
            <p>Select an envelope option to view details in Card 3.</p>
            <button onclick="updateCard3('Groceries')">Groceries</button>
            <button onclick="updateCard3('Rent')">Rent</button>
        `;
    } else if (contentType === 'accounts') {
        card2Content.innerHTML = `
            <h3>Accounts</h3>
            <p>Select an account to view details in Card 3.</p>
            <button onclick="updateCard3('Savings')">Savings</button>
            <button onclick="updateCard3('Vacation')">Vacation</button>
        `;
    }
}

// Function to update Card 3 based on selection from Card 2
function updateCard3(selection) {
    const card3Content = document.querySelector('.card-3-content');
    card3Content.innerHTML = `<h3>${selection} Details</h3><p>Details about ${selection} will be shown here.</p>`;
}
