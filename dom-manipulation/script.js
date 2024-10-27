// Sample quotes array
const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Philosophical" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Inspirational" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Philosophical" }
];

// Function to populate categories
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Using map to get unique categories

    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Display quotes based on restored filter
}

// Function to filter quotes
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteContainer = document.getElementById('quoteContainer');
    quoteContainer.innerHTML = '';

    // Filter and display quotes
    quotes.forEach(quote => {
        if (selectedCategory === 'all' || quote.category === selectedCategory) {
            const quoteElement = document.createElement('div');
            quoteElement.textContent = quote.text;
            quoteContainer.appendChild(quoteElement);
        }
    });

    // Save last selected category
    localStorage.setItem('lastSelectedCategory', selectedCategory);
}

// Initializing the app
document.addEventListener('DOMContentLoaded', populateCategories);
