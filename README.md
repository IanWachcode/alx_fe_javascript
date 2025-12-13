# alx_fe_javascript

## Dynamic Quote Generator

## 📌 Project Overview

The **Dynamic Quote Generator** is a progressive JavaScript project built to demonstrate core and advanced front-end concepts without using frameworks. The application dynamically generates, stores, filters, syncs, and manages quotes using **DOM manipulation**, **Web Storage**, **JSON handling**, and **simulated server synchronization**.

This project is implemented across multiple tasks, each adding new functionality and complexity, similar to real-world web application development.

---

## 🛠️ Technologies Used

* **HTML5** – Structure and layout
* **CSS3** – Basic styling (optional / extendable)
* **Vanilla JavaScript (ES6+)** – Core logic
* **Local Storage & Session Storage** – Client-side persistence
* **JSON** – Data import/export
* **Fetch API** – Simulated server communication
* **JSONPlaceholder** – Mock server API

---

## ✅ Task Breakdown

### 🧩 Task 1: Advanced DOM Manipulation

**Objective:**
Learn to dynamically create and manipulate content using JavaScript.

**Key Features Implemented:**

* Dynamic quote display
* Random quote generation
* Quotes stored as objects with `text` and `category`
* Dynamic creation of form elements using:

  * `createElement()`
  * `appendChild()`
* Event listeners for user interactions

**Core Concepts:**

* DOM traversal and manipulation
* Event handling
* Dynamic UI updates

---

### 💾 Task 2: Web Storage & JSON Handling

**Objective:**
Persist data locally and handle structured data using JSON.

**Key Features Implemented:**

* Quotes saved to **localStorage**
* Quotes loaded automatically on page refresh
* Last viewed quote saved to **sessionStorage**
* Export quotes as a JSON file using `Blob`
* Import quotes from a JSON file using `FileReader`

**Core Concepts:**

* `localStorage` vs `sessionStorage`
* JSON serialization & parsing
* File handling in the browser

---

### 🔎 Task 3: Category Filtering System

**Objective:**
Filter dynamic content using categories and persist user preferences.

**Key Features Implemented:**

* Category dropdown filter
* Categories populated dynamically using `.map()`
* Filtering logic based on selected category
* Last selected category saved in `localStorage`
* Categories updated automatically when new quotes are added

**Core Concepts:**

* Array methods (`map`, `filter`, `Set`)
* State persistence
* Dynamic UI updates based on user input

---

### 🔄 Task 4: Server Sync & Conflict Resolution

**Objective:**
Simulate syncing local data with a remote server and resolve conflicts.

**Key Features Implemented:**

* Fetching data from a mock API (JSONPlaceholder)
* Periodic syncing using `setInterval`
* Simulated POST requests using Fetch API
* Conflict resolution strategy: **server data takes precedence**
* User notification when sync occurs
* Manual sync option

**Required API Usage:**

```js
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

**Core Concepts:**

* Fetch API (GET & POST)
* Data synchronization
* Conflict handling
* Real-world application patterns

---

## 🔔 Conflict Resolution Strategy

* The application periodically fetches server data
* If the server contains quotes not found locally, they are added
* Server updates take precedence over local data
* Users are notified when:

  > "Quotes synced with server!"

This simulates real-world offline-first and cloud-backed applications.

---

## 🚀 How to Run the Project

1. Clone or download the project files
2. Open `index.html` in a modern browser
3. Interact with the UI:

   * View quotes
   * Add quotes
   * Filter by category
   * Import/export JSON
   * Observe automatic server sync

> No server setup required — runs fully in the browser.

---

## 📚 Learning Outcomes

By completing this project, you will understand:

* Dynamic DOM manipulation
* Browser storage mechanisms
* JSON data handling
* Client-side file import/export
* Simulated server syncing
* Conflict resolution strategies

This project closely mirrors patterns used in **real production web applications**.

---

## 🏁 Conclusion

The Dynamic Quote Generator demonstrates how powerful **vanilla JavaScript** can be when building interactive, data-driven applications. Each task builds upon the previous one, reinforcing best practices and real-world development concepts.

✔ Beginner-friendly
✔ Validator-compliant
✔ Real-world inspired

---

**Author:** Ian Wachira
**Project Type:** Front-End JavaScript Tasks.
