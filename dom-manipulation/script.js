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

showRandomQuote();
newQuoteButton.addEventListener("click", showRandomQuote);

// ----------------------------
// STEP 4: Dynamically create the Add-Quote form
// REQUIRED BY ASSIGNMENT
// ----------------------------
function createAddQuoteForm() {
  // Parent container
  const formContainer = document.createElement("div");
  formContainer.style.marginTop = "20px";

  // Input for quote text
  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  // Input for category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.style.marginLeft = "10px";

  // Add button
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.style.marginLeft = "10px";

  // Add event to button
  addButton.addEventListener("click", addQuote);

  // Append elements
  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Add to body
  document.body.appendChild(formContainer);
}

// Call the function so it runs
createAddQuoteForm();

// ----------------------------
// STEP 5: Add quote function
// ----------------------------
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields!");
    return;
  }

  const newQuote = {
    text: newText,
    category: newCategory.toLowerCase()
  };

  quotes.push(newQuote);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
  alert("New quote added successfully!");
}
