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

    // Restore last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastSelectedCategory;
    filterQuotes(); // Display quotes based on restored filter
}
