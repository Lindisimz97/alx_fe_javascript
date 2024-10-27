// Sample quotes array
const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Philosophical" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Inspirational" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Philosophical" }
];

// Reference to the container that displays quotes
const quoteDisplay = document.getElementById('quoteContainer');

// Function to populate the categories dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option); // Append the new option to the dropdown
    });

    // Restore last selected filter
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Display quotes based on restored filter
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    quoteDisplay.innerHTML = ''; // Clear previous quotes

    // Filter and display quotes
    const filteredQuotes = quotes.filter(quote => selectedCategory === 'all' || quote.category === selectedCategory);

    // Display a random quote from filtered results
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length); // Use Math.random to get a random index
        const randomQuote = filteredQuotes[randomIndex]; // Select a random quote
        const quoteElement = document.createElement('div');
        quoteElement.textContent = randomQuote.text;
        quoteDisplay.appendChild(quoteElement); // Append the random quote to the container
    } else {
        const noQuoteElement = document.createElement('div');
        noQuoteElement.textContent = "No quotes available for this category.";
        quoteDisplay.appendChild(noQuoteElement); // Show a message if no quotes are found
    }

    // Save last selected category in local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Initializing the application
document.addEventListener('DOMContentLoaded', () => {
    populateCategories(); // Call to populate categories when the page loads
});
