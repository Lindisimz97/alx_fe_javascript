// Initialize an array to hold quotes
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes = storedQuotes;
        displayQuotes();
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display quotes on the webpage
function displayQuotes() {
    const quotesContainer = document.getElementById('quotesContainer'); // Your quotes display element
    quotesContainer.innerHTML = ''; // Clear the current display
    quotes.forEach((quote) => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote'); // Add a class for styling
        quoteElement.textContent = quote;
        quoteElement.addEventListener('click', () => {
            // Store the last viewed quote in session storage
            sessionStorage.setItem('lastViewedQuote', quote);
        });
        quotesContainer.appendChild(quoteElement);
    });
}

// Function to add a new quote
function addQuote(newQuote) {
    if (!newQuote.trim()) {
        alert('Please enter a valid quote.'); // Basic validation
        return; // Exit the function if input is invalid
    }
    quotes.push(newQuote);
    saveQuotes(); // Save to local storage
    displayQuotes(); // Update the displayed quotes
}

// Function to export quotes to a JSON file
function exportToJson() {
    const jsonStr = JSON.stringify(quotes, null, 2); // Pretty print the JSON
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json'; // Name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader(); // Create a new FileReader instance
    fileReader.onload = function(event) { // Define the onload function
        try {
            const importedQuotes = JSON.parse(event.target.result); // Parse the imported JSON
            quotes.push(...importedQuotes); // Add imported quotes to the existing array
            saveQuotes(); // Update local storage
            displayQuotes(); // Refresh the display
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Failed to import quotes. Please ensure the file is in valid JSON format.');
        }
    };
    fileReader.readAsText(event.target.files[0]); // Read the uploaded file as text
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes(); // Load existing quotes from local storage
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        alert(`Last viewed quote: ${lastQuote}`); // Show last viewed quote
    }
});
