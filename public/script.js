
const BASE_URL = 'http://localhost:3000';

// Helper function to display results
function displayResult(elementId, data) {
    document.getElementById(elementId).innerText = JSON.stringify(data, null, 2);
}

// 1. Get All Companies
async function getAll() {
    try {
        const response = await fetch(`${BASE_URL}/company`);
        const companies = await response.json();
        displayResult('getAllResult', companies);
    } catch (error) {
        displayResult('getAllResult', { error: error.message });
    }
}

// 3. Get Company by Rank
async function getByRank() {
    const rank = document.getElementById('getByRankInput').value;
    try {
        const response = await fetch(`${BASE_URL}/company/${rank}`);
        const companies = await response.json();
        displayResult('getByRankResult', companies);
    } catch (error) {
        displayResult('getByRankResult', { error: error.message });
    }
}

// 4. Create New Company
async function createEntry() {
    let newCompany = JSON.parse(document.getElementById('createEntryData').value);
    console.log("Data received from frontend:", newCompany);

    try {
        const response = await fetch(`${BASE_URL}/company`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCompany)
        });
        const result = await response.json();
        displayResult('createResult', result);
    } catch (error) {
        displayResult('createResult', { error: error.message });
    }
}

// 5. Update Company by ID
async function updateById() {
    const id = document.getElementById('updateByIdInput').value.trim();
    let updatedData = JSON.parse(document.getElementById('updateDataInput').value);

    // Remove fields with null or empty values
    updatedData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    );
    
    try {
        const response = await fetch(`${BASE_URL}/company/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        const result = await response.json();
        displayResult('updateByIdResult', result);
    } catch (error) {
        displayResult('updateByIdResult', { error: error.message });
    }
}


// 6. Delete Company by ID
async function deleteById() {
    const id = document.getElementById('deleteByIdInput').value.trim();  // Trim to remove extra spaces
    console.log("Attempting to delete company with ID:", id);  // Debug log

    try {
        const response = await fetch(`${BASE_URL}/company/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }  // Add headers to ensure proper handling
        });

        if (!response.ok) {
            throw new Error(`Failed with status: ${response.status}`);
        }

        const result = await response.json();
        displayResult('deleteByIdResult', result);
    } catch (error) {
        displayResult('deleteByIdResult', { error: error.message });
        console.error("Delete Error:", error);
    }
}
