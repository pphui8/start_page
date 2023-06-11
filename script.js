const searchEngineSelect = document.getElementById('search-engine');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // const searchEngine = searchEngineSelect.value;
        const searchTerm = encodeURIComponent(searchInput.value);

        // const searchURL = searchEngine === 'google'
            // ? `https://www.google.com/search?q=${searchTerm}`
            // : `https://www.bing.com/search?q=${searchTerm}`;

        const searchURL = `https://www.google.com/search?q=${searchTerm}`;

        window.location.href = searchURL;
    }
});