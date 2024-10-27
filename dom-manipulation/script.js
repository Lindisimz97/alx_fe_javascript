const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example URL
const LOCAL_STORAGE_KEY = 'quotes';

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const quotes = await response.json();
        return quotes.map(quote => quote.title); // Assuming quotes are in the title
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

// Function to post new quotes to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: quote, body: quote, userId: 1 }) // Example payload
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Quote posted:', data);
    } catch (error) {
        console.error('Error posting quote:', error);
    }
}

// Function to sync local data with server data
async function syncQuotesWithServer() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Check for new quotes and update local storage
    const newQuotes = serverQuotes.filter(quote => !localQuotes.includes(quote));
    if (newQuotes.length > 0) {
        const updatedQuotes = [...localQuotes, ...newQuotes];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedQuotes));
        notifyUserConflictResolution('New quotes have been added from the server!');
    }

    // Simple conflict resolution: server data takes precedence
    if (localQuotes.length !== serverQuotes.length) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverQuotes));
        notifyUserConflictResolution('Quotes synced with server!');
    }

    // Example: Post a new quote if it doesn't exist locally
    const newQuoteToPost = 'This is a new quote!'; // Change as needed
    if (!localQuotes.includes(newQuoteToPost)) {
        await postQuoteToServer(newQuoteToPost);
    }
}

// Notify users about conflicts or updates
function notifyUserConflictResolution(message) {
    alert(message);
}

// Main initialization function
async function init() {
    // Initial fetch and storage setup
    const initialQuotes = await fetchQuotesFromServer();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialQuotes));

    // Set intervals for sync and data fetching
    setInterval(syncQuotesWithServer, 30000); // Sync every 30 seconds
}

// Call the init function on page load
document.addEventListener('DOMContentLoaded', init);
