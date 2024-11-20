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

// Function to fetch envelope data
async function fetchEnvelopeData() {
    try {
        const response = await fetch('/envelopes/graphData');
        const data = await response.json();
        console.log('Fetched Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching envelope data:', error);
    }
}


// Function to render the envelope graph
async function renderEnvelopeGraph() {
    try {
        const data = await fetchEnvelopeData();

        const ctx = document.getElementById('envelopeGraph').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut', // Or 'pie'
            data: {
                labels: data.map(envelope => envelope.name),
                datasets: [
                    {
                        label: 'Spent',
                        data: data.map(envelope => envelope.spent),
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF'
                        ]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allow chart to fit its container
                plugins: {
                    legend: {
                        position: 'right' // Align legend to the right
                    }
                },
                animations: {
                    tension: {
                        duration: 1000, // Duration of the hover effect
                        easing: 'easeInOutElastic' // Easing effect for smooth transition
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                elements: {
                    arc: {
                        hoverOffset: 10, // How much the section enlarges on hover
                        borderWidth: 2, // Optional: Makes the border more pronounced
                        borderColor: 'white' // Optional: Highlight the border on hover
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error rendering envelope graph:', error);
    }
}

// Ensure the graph renders when the page loads
document.addEventListener("DOMContentLoaded", function () {
    renderEnvelopeGraph();
});
