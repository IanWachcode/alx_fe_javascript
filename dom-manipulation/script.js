// ----------------------------
// STEP 1: Create the quotes array
// ----------------------------
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: 'motivation' },
  { text: "Life is what happens when you're busy making other plans.", category: 'life' },
  { text: "Get busy living or get busy dying.", category: 'motivation' },
  { text: "Innovation distinguishes between a leader and a follower.", category: 'success' }
];

// STEP 2: Get DOM elements we need
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");

// ----------------------------
// STEP 3: Function to show a random quote
// ----------------------------
function showRandomQuote() {
  // Pick a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display quote with category
  quoteDisplay.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p style="color: gray;">Category: ${quote.category}</p>
  `;
}

// Call once when page loads to display a quote immediately
showRandomQuote();

// Button event listeners
newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// ----------------------------
// STEP 4: Function to add a new quote dynamically
// ----------------------------
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  // Basic validation
  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields!");
    return;
  }

  // Create a new quote object
  const newQuote = {
    text: newText,
    category: newCategory
  };

  // Add to the array
  quotes.push(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added successfully!");
}
