// --- Mockdata ---
let orders = [
  { id: 1, klant: "Jan Jansen", datum: "2025-11-04", status: "In behandeling" },
  { id: 2, klant: "Lisa Vermeer", datum: "2025-11-03", status: "Bevestigd" }
];

const attractions = [
  { id: 1, naam: "Reuzenrad", beschikbaar: true },
  { id: 2, naam: "Spookhuis", beschikbaar: false },
  { id: 3, naam: "Achtbaan", beschikbaar: true },
  { id: 4, naam: "Schommelschip", beschikbaar: true }
];

// --- Elementen ophalen ---
const orderTable = document.querySelector("#orderTable tbody");
const orderFormSection = document.querySelector("#order-form-section");
const newOrderBtn = document.querySelector("#newOrderBtn");
const attractionsList = document.querySelector("#attractionsList");
const cancelOrderBtn = document.querySelector("#cancelOrder");
const saveOrderBtn = document.querySelector("#saveOrder");
const customerInput = document.querySelector("#customerName");
const dateInput = document.querySelector("#orderDate");

let editingOrderId = null; // Houdt bij welke order we aan het bewerken zijn

// --- Functies ---

// Orders renderen
function renderOrders() {
  orderTable.innerHTML = "";
  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.klant}</td>
      <td>${order.datum}</td>
      <td>${order.status}</td>
      <td>
        <button class="btn btn-secondary" onclick="editOrder(${order.id})">Bewerk</button>
        <button class="btn btn-secondary" onclick="deleteOrder(${order.id})">Verwijder</button>
      </td>
    `;
    orderTable.appendChild(row);
  });
}

// Attracties renderen
function renderAttractions() {
  attractionsList.innerHTML = "";
  attractions.forEach(attr => {
    const div = document.createElement("div");
    div.className = `attraction ${attr.beschikbaar ? "available" : "unavailable"}`;
    div.innerHTML = `
      <strong>${attr.naam}</strong><br>
      ${attr.beschikbaar 
        ? "<span class='status-available'>Beschikbaar</span><br><label><input type='checkbox' value='" + attr.id + "'> Selecteer</label>" 
        : "<span class='status-unavailable'>Volgeboekt</span>"}
    `;
    attractionsList.appendChild(div);
  });
}

// Nieuwe order toevoegen
newOrderBtn.addEventListener("click", () => {
  orderFormSection.classList.remove("hidden");
  renderAttractions();
  customerInput.value = "";
  dateInput.value = "";
  editingOrderId = null; // reset naar nieuwe order modus
});

// Annuleren
cancelOrderBtn.addEventListener("click", () => {
  orderFormSection.classList.add("hidden");
  editingOrderId = null;
});

// Opslaan (nieuw of bewerken)
saveOrderBtn.addEventListener("click", () => {
  const klant = customerInput.value.trim();
  const datum = dateInput.value;

  if (!klant || !datum) {
    alert("Vul alle velden in!");
    return;
  }

  if (editingOrderId) {
    // Bestaande order bijwerken
    const order = orders.find(o => o.id === editingOrderId);
    if (order) {
      order.klant = klant;
      order.datum = datum;
      alert(`Order #${order.id} is bijgewerkt.`);
    }
  } else {
    // Nieuwe order aanmaken
    const newOrder = {
      id: orders.length + 1,
      klant,
      datum,
      status: "In behandeling"
    };
    orders.push(newOrder);
    alert(`Nieuwe order (#${newOrder.id}) toegevoegd.`);
  }

  renderOrders();
  orderFormSection.classList.add("hidden");
  editingOrderId = null;
});

// Order bewerken
function editOrder(id) {
  const order = orders.find(o => o.id === id);
  if (!order) return;

  editingOrderId = id;
  customerInput.value = order.klant;
  dateInput.value = order.datum;

  orderFormSection.classList.remove("hidden");
  renderAttractions();
}

// Order verwijderen
function deleteOrder(id) {
  if (confirm("Weet je zeker dat je deze order wilt verwijderen?")) {
    orders = orders.filter(o => o.id !== id);
    renderOrders();
  }
}

// Initialiseren
renderOrders();
