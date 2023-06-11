const searchEngineSelect = document.getElementById("engine-icon-container");
const searchInput = document.getElementById('search-input');

const googleIcon = document.getElementById('googleIcon');
const bingIcon = document.getElementById('bingIcon');

let searchEngine = 'bing';

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // console.log(searchEngine);
        const searchTerm = encodeURIComponent(searchInput.value);
        const searchURL = searchEngine === 'bing' ? `https://www.bing.com/search?q=${searchTerm}` : `https://www.google.com/search?q=${searchTerm}`;

        window.location.href = searchURL;
    }
});

searchEngineSelect.addEventListener('click', () => {
        if(searchEngine === 'bing') {
            searchEngine = 'google';
            googleIcon.setAttribute('style', 'display: inline-block');
            bingIcon.setAttribute('style', 'display: none');
        } else {
            searchEngine = 'bing';
            googleIcon.setAttribute("style", "display: none");
            bingIcon.setAttribute('style', 'display: inline-block');
        }
    }
);
