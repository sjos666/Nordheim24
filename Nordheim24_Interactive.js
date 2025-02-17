// Produkt-Datenbank (Beispielprodukte)
const products = [
    { id: 1, name: "Frische Brötchen", price: 2.20 },
    { id: 2, name: "Milch", price: 2.50 },
    { id: 3, name: "Äpfel (1kg)", price: 3.00 }
];

// Warenkorb-Array (wird im localStorage gespeichert)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funktion zum Hinzufügen eines Produkts in den Warenkorb
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} wurde in den Warenkorb gelegt!`);
        updateCartDisplay();
    }
}

// **Neuer Fix: updateCartDisplay leert den Warenkorb immer vollständig**
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");

    // Löscht vorherigen Inhalt, damit keine Duplikate entstehen
    cartContainer.innerHTML = "";

    // Warenkorb-Überschrift
    const cartTitle = document.createElement("h3");
    cartTitle.textContent = "🛒 Dein Warenkorb";
    cartContainer.appendChild(cartTitle);

    // Falls der Warenkorb leer ist
    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Dein Warenkorb ist leer.";
        cartContainer.appendChild(emptyMessage);
        return;
    }

    // Produkte im Warenkorb anzeigen
    cart.forEach((item, index) => {
        const itemElement = document.createElement("p");
        itemElement.innerHTML = `${item.name} - ${item.price.toFixed(2)}€ `;

        // Entfernen-Button
        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.addEventListener("click", function() {
            removeFromCart(index);
        });

        itemElement.appendChild(removeButton);
        cartContainer.appendChild(itemElement);
    });

    // Gesamtpreis anzeigen
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement("h4");
    totalElement.textContent = `Gesamt: ${total.toFixed(2)}€`;
    cartContainer.appendChild(totalElement);

    // Checkout-Button erstellen
    const checkoutButton = document.createElement("button");
    checkoutButton.textContent = "🛍️ Zur Kasse";
    checkoutButton.addEventListener("click", function() {
        checkout();
    });

    cartContainer.appendChild(checkoutButton);
}

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout-Funktion (PayPal-Integration folgt)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// **Sicherstellen, dass updateCartDisplay nur einmal aufgerufen wird**
document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});