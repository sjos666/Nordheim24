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
        updateCartDisplay();
    }
}

// **NEUER FIX: updateCartDisplay löscht den vorherigen Warenkorb korrekt**
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    
    // Vorherigen Inhalt löschen, um doppelte Anzeigen zu vermeiden
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement("p");
        itemElement.innerHTML = `${item.name} - ${item.price.toFixed(2)}€ `;

        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.addEventListener("click", function() {
            removeFromCart(index);
        });

        itemElement.appendChild(removeButton);
        cartContainer.appendChild(itemElement);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalElement = document.createElement("h4");
    totalElement.textContent = `Gesamt: ${total.toFixed(2)}€`;
    cartContainer.appendChild(totalElement);

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

// Checkout-Funktion
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// **Nur einmalige Initialisierung des Warenkorbs**
document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});