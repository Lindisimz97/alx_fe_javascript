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
    a.download = 'quot
