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
// [{searchString: Date.now()}]
let localHistoryItems = [];

// when window is loaded
window.addEventListener("load", () => {
    // initialize history items from local storage
    localHistoryItems = JSON.parse(localStorage.getItem("historyItems"));

    if (localHistoryItems === null || localHistoryItems === undefined) {
      localHistoryItems = [];
    }
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      search();
    }
});

searchInput.addEventListener("keyup", (event) => {
  if(event.key === 'Backspace' && searchInput.value === '') {
    historyContainer.setAttribute("style", "visibility: hidden; opacity: 0");
  }
});

searchInput.addEventListener("input", () => {
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
  // if redundent
  
  const isRedundent = localHistoryItems.find(obj => {
    return Object.keys(obj)[0] === searchString
  });

  const isRedundentStatic = defaultHistory.find((obj) => {
    return Object.keys(obj)[0] === searchString;
  });

  if(isRedundent === undefined && isRedundentStatic === undefined ) {
    const curHistoryItem = {};
    curHistoryItem[searchString] = Date.now();
    localHistoryItems.push(curHistoryItem);

    // if longer than 500, trim the formal one
    if(localHistoryItems.length >= 500) {
      localHistoryItems.shift();
    }
    
    localStorage.setItem("historyItems", JSON.stringify(localHistoryItems));
  }
    
  const searchTerm = searchString.split(/\s+/);
  encodeURI(searchTerm);
  const searchParam = searchTerm.join("+");

  const searchURL =
    searchEngine === "bing"
      ? `https://www.bing.com/search?q=${searchTerm}`
      : `https://www.google.com/search?q=${searchTerm}`;

  window.location.href = searchURL;
};

const searchWithItem = (searchTerms) => {
  const searchTerm = searchTerms.split(/\s+/);
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
  searchEngineUrl = searchEngine === "bing" ? "www.bing.com" : "www.google.com";

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
  const matchedLocalHistory = localHistoryItems.filter((item) => {
    const key = Object.keys(item)[0];
    return key.includes(searchInput.value);
  });

  // insert into history selector
  matchedLocalHistory.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    const ele = document.createElement("li");
    ele.addEventListener("click", () => {
      searchWithItem(key);
    });
    ele.innerHTML = `${key}`;
    historySelector.append(ele);
  });
};