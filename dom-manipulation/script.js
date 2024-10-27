// Array of quote objects with text and category
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
  { text: "You miss 100% of the shots you don’t take.", category: "Courage" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", category: "Wisdom" }
];

// Select DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `<p>${selectedQuote.text}</p><small>Category: ${selectedQuote.category}</small>`;
}

// Function to dynamically create the form for adding quotes
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create input for quote text
  const quoteTextInput = document.createElement('input');
  quoteTextInput.id = 'newQuoteText';
  quoteTextInput.type = 'text';
  quoteTextInput.placeholder = 'Enter a new quote';
  formContainer.appendChild(quoteTextInput);

  // Create input for quote category
  const quoteCategoryInput = document.createElement('input');
  quoteCategoryInput.id = 'newQuoteCategory';
  quoteCategoryInput.type = 'text';
  quoteCategoryInput.placeholder = 'Enter quote category';
  formContainer.appendChild(quoteCategoryInput);

  // Create button to add the quote
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  formContainer.appendChild(addButton);

  // Append form to the body or another container
  document.body.appendChild(formContainer);
}

// Function to add a new quote from input fields
function addQuote() {
  // Get input values
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  // Check if inputs are filled
  if (quoteText && quoteCategory) {
    // Create a new quote object
    const newQuote = { text: quoteText, category: quoteCategory };
    quotes.push(newQuote); // Add new quote to array

    // Update DOM with the new quote
    quoteDisplay.innerHTML = `<p>${newQuote.text}</p><small>Category: ${newQuote.category}</small>`;

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    alert("New quote added!");
  } else {
    alert("Please enter both the quote and category.");
  }
}

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);

// Display the first random quote on page load and create the form
showRandomQuote();
createAddQuoteForm();
