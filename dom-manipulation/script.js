// Sample quotes array with categories
const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Philosophical" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Inspirational" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Philosophical" }
];

// Function to populate categories in the dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set();

    // Extract unique categories from quotes array
    quotes.forEach(quote => {
        categories.add(quote.category);
    });

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Call filterQuotes to display quotes based on the restored filter
}

// Function to filter quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteContainer = document.getElementById('quoteContainer');
    quoteContainer.innerHTML = '';

    // Filter quotes based on selected category
    const filteredQuotes = quotes.filter(quote => 
        selectedCategory === 'all' || quote.category === selectedCategory
    );

    // Display filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote.text;
        quoteContainer.appendChild(quoteElement);
    });

    // Save the last selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Function to add a new quote
function addQuote(text, category) {
    // Create a new quote object and add it to the quotes array
    const newQuote = { text: text, category: category };
    quotes.push(newQuote);

    // Populate categories to ensure the new category is reflected in the dropdown
    populateCategories();
    
    // Filter quotes to display the newly added quote
    filterQuotes();

    // Save the updated quotes array to local storage (optional, if you want to persist quotes)
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    populateCategories(); // Populate categories when the page loads
});

// Example usage of the addQuote function
// addQuote("New quote example", "New Category");
