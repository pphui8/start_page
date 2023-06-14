const defaultHistory = [
  { github: "https://github.com/pphui8" },
  { pphui8: "https://pphui8.com" },
  { blog: "https://blog.pphui8.com" },
  { bilibili: "https://bilibili.com" },
  { youtube: "https://youtube.com" },
];

const searchContainer = document.getElementById("search-container");
const searchEngineSelect = document.getElementById("engine-icon-container");
const searchInput = document.getElementById("search-input");

const googleIcon = document.getElementById("googleIcon");
const bingIcon = document.getElementById("bingIcon");

const historyContainer = document.getElementById("history-container");

const historySelector = document.getElementById("history-selector");

const searchIconContainer = document.getElementById("search-icon-container");

let searchEngine = "bing";
let localHistoryItems = [];

// when window is loaded
window.addEventListener("load", () => {

    // initialize history items from local storage
    localHistoryItems = JSON.parse(localStorage.getItem("historyItems"));
    console.log(localHistoryItems);

});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const searchTerm = searchInput.value.trim().split(/\s+/);

        encodeURI(searchTerm);

        const searchParam = searchTerm.join("+");

        const searchURL =
        searchEngine === "bing"
            ? `https://www.bing.com/search?q=${searchTerm}`
            : `https://www.google.com/search?q=${searchTerm}`;

        window.location.href = searchURL;
    }
});

searchInput.addEventListener("keyup", () => {
  if (searchInput.value !== "" && searchInput.value !== null) {
    showHistory();
    
  } else if (event.key === "Backspace" && searchInput.value === "") {
    historyContainer.setAttribute("style", "visibility: hidden; opacity: 0");
  }
});

document.addEventListener("click", (event) => {
  historyContainer.setAttribute("style", "visibility: hidden; opacity: 0");
  searchInput.value = "";
});

historySelector.addEventListener("click", (event) => {
  event.stopPropagation();
});

searchContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});

searchEngineSelect.addEventListener("click", () => {
  if (searchEngine === "bing") {
    searchEngine = "google";
    googleIcon.setAttribute("style", "display: inline-block");
    bingIcon.setAttribute("style", "display: none");
  } else {
    searchEngine = "bing";
    googleIcon.setAttribute("style", "display: none");
    bingIcon.setAttribute("style", "display: inline-block");
  }
});

searchIconContainer.addEventListener("click", () => {
  search();
});


// functions
const search = () => {
  const searchString = searchInput.value.trim();
  // store search string into local storage
  

  
  const searchTerm = searchString.split(/\s+/);
  encodeURI(searchTerm);

  const searchParam = searchTerm.join("+");

  const searchURL =
    searchEngine === "bing"
      ? `https://www.bing.com/search?q=${searchTerm}`
      : `https://www.google.com/search?q=${searchTerm}`;

  window.location.href = searchURL;
};

const showHistory = () => {
  historySelector.innerHTML = "";
  historyContainer.setAttribute("style", "visibility: visible; opacity: 1");

  // // 1. add a <li> to history selector (Todo)
  // const ele = document.createElement("li");

  // 2. insert default history items
  const matchedHistory = defaultHistory.filter((item) => {
    const key = Object.keys(item)[0];
    return key.includes(searchInput.value);
  });

  // insert into history selector
  matchedHistory.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    const ele = document.createElement("li");
    ele.addEventListener("click", () => {
      window.location.href = value;
    });
    ele.innerHTML = `${key}`;
    historySelector.append(ele);
  });

  // 3. insert history items from local storage
  if (localHistoryItems == null) {
    console.log("abc");
  }
};