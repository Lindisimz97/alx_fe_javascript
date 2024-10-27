let quotes = [];

function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes = storedQuotes;
        displayQuotes();
    }
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function displayQuotes() {
    const quotesContainer = document.getElementById('quotesContainer');
    quotesContainer.innerHTML = ''; 
    quotes.forEach((quote) => {
        const quoteElement = document.createElement('div');
        quoteElement.classList.add('quote');
        quoteElement.textContent = quote;
        quoteElement.addEventListener('click', () => {
            sessionStorage.setItem('lastViewedQuote', quote);
        });
        quotesContainer.appendChild(quoteElement);
    });
}

function addQuote(newQuote) {
    if (!newQuote.trim()) {
        alert('Please enter a valid quote.'); 
        return; 
    }
    quotes.push(newQuote);
    saveQuotes();
    displayQuotes();
}

function exportToJson() {
    const jsonStr = JSON.stringify(quotes, null, 2); 
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader(); 
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result); 
            quotes.push(...importedQuotes);
            saveQuotes(); 
            displayQuotes();
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Failed to import quotes. Please ensure the file is in valid JSON format.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    const lastQuote = sessionStorage.getItem('lastViewedQuote');
    if (lastQuote) {
        alert(`Last viewed quote: ${lastQuote}`); 
    }
});
