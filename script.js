const searchContainer = document.getElementById('search-container');
const searchEngineSelect = document.getElementById("engine-icon-container");
const searchInput = document.getElementById('search-input');

const googleIcon = document.getElementById('googleIcon');
const bingIcon = document.getElementById('bingIcon');

const historyContainer = document.getElementById('history-container');

let searchEngine = 'bing';

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // console.log(searchEngine);
        const searchTerm = encodeURIComponent(searchInput.value);
        const searchURL = searchEngine === 'bing' ? `https://www.bing.com/search?q=${searchTerm}` : `https://www.google.com/search?q=${searchTerm}`;

        window.location.href = searchURL;
    }
});

searchInput.addEventListener('keyup', () => {
        if(searchInput.value !== '' && searchInput.value !== null) {
            historyContainer.setAttribute('style', 'visibility: visible; opacity: 1');

            // insert history item


        } else if (event.key === "Backspace" && searchInput.value === "") {
            historyContainer.setAttribute(
              "style",
              "visibility: hidden; opacity: 0"
            );
        }
    }
);

document.addEventListener('click', (event) => {
    historyContainer.setAttribute(
        "style",
        "visibility: hidden; opacity: 0"
    );
    searchInput.value = '';
});

historyContainer.addEventListener('click', (event) => {
    event.stopPropagation();
});

searchContainer.addEventListener('click', (event) => {
    event.stopPropagation();
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
