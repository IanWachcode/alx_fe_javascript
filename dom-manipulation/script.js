// ----------------------------
// Quotes + Storage Keys
// ----------------------------
const LOCAL_KEY = "dynamicQuotes_v1";
const SESSION_KEY = "lastViewedQuote_session";
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
const SYNC_INTERVAL = 60000; // 1 minute

let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "Get busy living or get busy dying.", category: "motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "success" }
];

// ----------------------------
// DOM references
// ----------------------------
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteSection = document.getElementById("addQuoteSection");
const lastViewedDiv = document.getElementById("lastViewed");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");


// ----------------------------
// Storage helpers
// ----------------------------
function saveQuotes() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(quotes));
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
}

function loadQuotes() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return; // nothing saved yet
    const parsed = JSON.parse(raw);
    // Basic validation: parsed must be an array of objects with text property
    if (Array.isArray(parsed) && parsed.every(q => q && typeof q.text === "string")) {
      quotes = parsed;
    } else {
      console.warn("Local storage contains invalid quotes data — ignoring.");
    }
  } catch (err) {
    console.error("Failed to load from localStorage:", err);
  }
}

// ----------------------------
// Session storage: last viewed quote
// ----------------------------
function saveLastViewedToSession(quote) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(quote));
  } catch (err) {
    console.warn("Could not save session data:", err);
  }
}

function loadLastViewedFromSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Failed to read last viewed from session:", err);
    return null;
  }
}

function renderLastViewed() {
  const q = loadLastViewedFromSession();
  if (!q) {
    lastViewedDiv.textContent = "No last viewed quote in this session.";
    return;
  }
  lastViewedDiv.innerHTML = `<em>Last viewed:</em> "${escapeHtml(q.text)}" <span style="color:gray;">(category: ${escapeHtml(q.category)})</span>`;
}

// small helper to avoid injecting raw HTML from imported data
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ----------------------------
// Show a random quote
// ----------------------------
function showRandomQuote() {
  if (!quotes || quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Render into DOM
  quoteDisplay.innerHTML = `
    <p><strong>"${escapeHtml(quote.text)}"</strong></p>
    <p style="color: gray;">Category: ${escapeHtml(quote.category)}</p>
  `;

  // Save last viewed in session
  saveLastViewedToSession(quote);
  renderLastViewed();
}

function populateCategories() {
  // extract categories using map (REQUIRED)
  const categories = quotes.map(q => q.category);

  // remove duplicates
  const uniqueCategories = [...new Set(categories)];

  // reset dropdown
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  uniqueCategories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // restore saved filter
  const savedFilter = localStorage.getItem("selectedCategory");
  if (savedFilter) {
    categoryFilter.value = savedFilter;
  }
}

function filterQuotes() {
  const selected = categoryFilter.value;

  // persist filter
  localStorage.setItem("selectedCategory", selected);

  let filteredQuotes = quotes;

  if (selected !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selected);
  }

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>"${escapeHtml(quote.text)}"</strong></p>
    <p style="color: gray;">Category: ${escapeHtml(quote.category)}</p>
  `;
}


// ----------------------------
// createAddQuoteForm (uses createElement + appendChild)
// ----------------------------
function createAddQuoteForm() {
  // wrapper
  const wrapper = document.createElement("div");

  // quote input
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";
  quoteInput.style.display = "block";
  quoteInput.style.width = "90%";
  quoteInput.style.marginBottom = "8px";

  // category input
  const catInput = document.createElement("input");
  catInput.id = "newQuoteCategory";
  catInput.type = "text";
  catInput.placeholder = "Enter quote category";
  catInput.style.display = "block";
  catInput.style.width = "50%";
  catInput.style.marginBottom = "8px";

  // add button
  const addBtn = document.createElement("button");
  addBtn.id = "addQuoteBtn";
  addBtn.textContent = "Add Quote";

  // note: event listener attached to addBtn
  addBtn.addEventListener("click", addQuote);

  // append children
  wrapper.appendChild(quoteInput);
  wrapper.appendChild(catInput);
  wrapper.appendChild(addBtn);

  // attach to container in DOM
  addQuoteSection.appendChild(wrapper);
}

// ----------------------------
// Add a new quote (also saves to localStorage)
// ----------------------------
function addQuote() {
  const newTextElem = document.getElementById("newQuoteText");
  const newCatElem = document.getElementById("newQuoteCategory");

  if (!newTextElem || !newCatElem) {
    alert("Form elements not found.");
    return;
  }

  const newText = newTextElem.value.trim();
  const newCategory = newCatElem.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields!");
    return;
  }

  const newQuote = { text: newText, category: newCategory };
  populateCategories();
  filterQuotes();

  // push and persist
  quotes.push(newQuote);
  saveQuotes();

  // clear UI fields
  newTextElem.value = "";
  newCatElem.value = "";

  // show the newly added quote
  quoteDisplay.innerHTML = `
    <p><strong>"${escapeHtml(newQuote.text)}"</strong></p>
    <p style="color: gray;">Category: ${escapeHtml(newQuote.category)}</p>
  `;

  // update session last viewed and render
  saveLastViewedToSession(newQuote);
  renderLastViewed();

  // friendly confirmation
  alert("New quote added and saved!");
}

// ----------------------------
// JSON Export (download file)
// ----------------------------
function exportQuotesToJson() {
  try {
    const json = JSON.stringify(quotes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    // suggested filename
    const filename = `quotes_export_${new Date().toISOString().slice(0,19).replaceAll(":","-")}.json`;
    a.download = filename;

    // append, click, remove
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // release object URL
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed:", err);
    alert("Export failed. See console for details.");
  }
}

async function postQuotesToServer(quotesToSend) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // REQUIRED
      headers: {
        "Content-Type": "application/json" // REQUIRED
      },
      body: JSON.stringify(quotesToSend)
    });

    const result = await response.json();
    console.log("Server POST response:", result);
    return result;
  } catch (error) {
    console.error("Failed to POST quotes to server:", error);
  }
}


// ----------------------------
// JSON Import (file input)
// ----------------------------
function importFromJsonFile(file) {
  if (!file) {
    alert("No file selected.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(String(e.target.result));
      if (!Array.isArray(parsed)) {
        alert("Imported JSON must be an array of quote objects.");
        return;
      }

      // Validate objects and merge while avoiding exact duplicates
      let added = 0;
      for (const item of parsed) {
        if (!item || typeof item.text !== "string") continue;
        const category = typeof item.category === "string" ? item.category : "uncategorized";
        // check duplicates: exact text + category match
        const exists = quotes.some(q => q.text === item.text && q.category === category);
        if (!exists) {
          quotes.push({ text: item.text, category });
          added++;
        }
      }

      if (added > 0) {
        saveQuotes();
        alert(`Imported ${added} new quotes.`);
      } else {
        alert("No new quotes were imported (duplicates or invalid items).");
      }
    } catch (err) {
      console.error("Failed to parse JSON file:", err);
      alert("Invalid JSON file. See console for details.");
    }
  };

  reader.onerror = function(err) {
    console.error("FileReader error:", err);
    alert("Failed to read file.");
  };

  reader.readAsText(file);
}

// ----------------------------
// Setup: load storage, render UI, attach listeners
// ----------------------------
function init() {
  // load persisted quotes (if any)
  loadQuotes();
  populateCategories();

  // build add-quote form
  createAddQuoteForm();

  // set up event listeners
  newQuoteButton.addEventListener("click", showRandomQuote);
  exportBtn.addEventListener("click", exportQuotesToJson);
  importBtn.addEventListener("click", () => importFileInput.click());
  importFileInput.addEventListener("change", (evt) => {
    const file = evt.target.files && evt.target.files[0];
    importFromJsonFile(file);
    // clear the value so same file can be re-imported if needed
    importFileInput.value = "";
  });

  // initial render: show last viewed if present, else a random quote
  const last = loadLastViewedFromSession();
  if (last) {
    quoteDisplay.innerHTML = `
      <p><strong>"${escapeHtml(last.text)}"</strong></p>
      <p style="color: gray;">Category: ${escapeHtml(last.category)}</p>
    `;
    renderLastViewed();
  } else {
    showRandomQuote();
  }
}

// run init when script is loaded
init();

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();

    // Convert server posts → quote format
    return data.slice(0, 5).map(post => ({
      text: post.title,
      category: "server"
    }));
  } catch (error) {
    console.error("Server fetch failed:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes.length === 0) return;

  let conflictDetected = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(
      local => local.text === serverQuote.text
    );

    if (!exists) {
      quotes.push(serverQuote);
      conflictDetected = true;
    }
  });

  if (conflictDetected) {
    saveQuotes();
    notifySync("New quotes synced from server.");
  }
}
const syncStatusDiv = document.getElementById("syncStatus");

function notifySync(message) {
  syncStatusDiv.textContent = message;

  setTimeout(() => {
    syncStatusDiv.textContent = "";
  }, 4000);
}

async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  if (serverQuotes.length === 0) return;

  let conflictDetected = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(q => q.text === serverQuote.text);
    if (!exists) {
      quotes.push(serverQuote);
      conflictDetected = true;
    }
  });

  if (conflictDetected) {
    saveQuotes();

    // 🔹 POST updated local data back to server (simulation)
    postQuotesToServer(quotes);

    notifySync("Server sync completed. Conflicts resolved.");
  }
}

// periodic server sync
setInterval(syncWithServer, SYNC_INTERVAL);

document.getElementById("manualSync")
  .addEventListener("click", async () => {
    await syncWithServer();
    alert("Manual sync complete.");
  });
// End of script.js


