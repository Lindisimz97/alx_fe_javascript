// Sample quotes array
const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Life is what happens when you're busy making other plans.", category: "Philosophical" },
    { text: "You only live once, but if you do it right, once is enough.", category: "Inspirational" },
    { text: "Get busy living or get busy dying.", category: "Motivational" },
    { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Philosophical" }
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index
    const quote = quotes[randomIndex].text; // Get the quote text
    quoteDisplay.textContent = quote; // Display the quote
}

// Initialize quoteDisplay
const quoteDisplay = document.getElementById('quoteDisplay'); // Ensure this ID exists in your HTML

// Call displayRandomQuote when the page loads
document.addEventListener('DOMContentLoaded', displayRandomQuote);
