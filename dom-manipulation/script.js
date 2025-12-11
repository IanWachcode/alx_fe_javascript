// ----------------------------
// STEP 1: Create the quotes array
// ----------------------------
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "life" },
  { text: "Get busy living or get busy dying.", category: "motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "success" }
];

// STEP 2: Get DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// ----------------------------
// STEP 3: Show a random quote
// ----------------------------
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p style="color: gray;">Category: ${quote.category}</p>
  `;
}

// Display a quote when page loads
showRandomQuote();

// Handle "Show New Quote" button
newQuoteButton.addEventListener("click", showRandomQuote);

// ----------------------------
// STEP 4: Add a new quote
// ----------------------------
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields!");
    return;
  }

  // Create quote object
  const newQuote = {
    text: newText,
    category: newCategory.toLowerCase()
  };

  // Add to list
  quotes.push(newQuote);

  // Clear fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Optional: Show newly added quote
  showRandomQuote();

  alert("New quote added successfully!");
}

// Attach event listener to Add button
addQuoteBtn.addEventListener("click", addQuote);

