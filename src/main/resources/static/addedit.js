// Function to add a new envelope
function addEnvelope(type) {
    const envelopeList = document.getElementById(`${type}-envelopes`);

    // Create a new div for the envelope
    const envelopeDiv = document.createElement('div');
    envelopeDiv.classList.add('envelope-form');

    // Create inputs for name and amount
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Envelope Name';
    nameInput.required = true; // Optional, if you want HTML5 validation as well

    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.placeholder = 'Amount';
    amountInput.required = true; // Optional, if you want HTML5 validation as well

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
        envelopeList.removeChild(envelopeDiv);
    };

    // Append inputs and button to the envelopeDiv
    envelopeDiv.appendChild(nameInput);
    envelopeDiv.appendChild(amountInput);
    envelopeDiv.appendChild(deleteButton);

    // Append the envelopeDiv to the envelopeList
    envelopeList.appendChild(envelopeDiv);
}

// Function to save changes
function saveChanges() {
    const monthlyEnvelopes = [];
    const annualEnvelopes = [];

    // Get monthly envelopes
    const monthlyList = document.getElementById('monthly-envelopes');
    const monthlyEnvelopeForms = monthlyList.getElementsByClassName('envelope-form');
    for (let form of monthlyEnvelopeForms) {
        const name = form.querySelector('input[type="text"]').value.trim();
        const amount = form.querySelector('input[type="number"]').value.trim();

        // Check if the name and amount are filled
        if (name === '' || amount === '') {
            alert("Please fill in all fields before saving."); // Alert for validation
            return; // Stop the function if validation fails
        }

        monthlyEnvelopes.push({ name, amount });
    }

    // Get annual envelopes
    const annualList = document.getElementById('annual-envelopes');
    const annualEnvelopeForms = annualList.getElementsByClassName('envelope-form');
    for (let form of annualEnvelopeForms) {
        const name = form.querySelector('input[type="text"]').value.trim();
        const amount = form.querySelector('input[type="number"]').value.trim();

        // Check if the name and amount are filled
        if (name === '' || amount === '') {
            alert("Please fill in all fields before saving."); // Alert for validation
            return; // Stop the function if validation fails
        }

        annualEnvelopes.push({ name, amount });
    }

    // Save to local storage
    localStorage.setItem('monthlyEnvelopes', JSON.stringify(monthlyEnvelopes));
    localStorage.setItem('annualEnvelopes', JSON.stringify(annualEnvelopes));

    // Confirmation message
    alert("Changes saved!");
}

// Function to load envelopes from local storage on page load
function loadEnvelopes() {
    const monthlyEnvelopes = JSON.parse(localStorage.getItem('monthlyEnvelopes')) || [];
    const annualEnvelopes = JSON.parse(localStorage.getItem('annualEnvelopes')) || [];

    monthlyEnvelopes.forEach(envelope => {
        addEnvelope('monthly');
        const envelopeList = document.getElementById('monthly-envelopes');
        const lastEnvelope = envelopeList.lastChild;
        lastEnvelope.querySelector('input[type="text"]').value = envelope.name;
        lastEnvelope.querySelector('input[type="number"]').value = envelope.amount;
    });

    annualEnvelopes.forEach(envelope => {
        addEnvelope('annual');
        const envelopeList = document.getElementById('annual-envelopes');
        const lastEnvelope = envelopeList.lastChild;
        lastEnvelope.querySelector('input[type="text"]').value = envelope.name;
        lastEnvelope.querySelector('input[type="number"]').value = envelope.amount;
    });
}

// Load envelopes when the page loads
window.onload = loadEnvelopes;
