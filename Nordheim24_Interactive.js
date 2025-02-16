// Produkt-Datenbank (Beispielprodukte)
const products = [
    { id: 1, name: "Frische Brötchen", price: 1.20 },
    { id: 2, name: "Bio-Milch", price: 2.50 },
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

// Funktion zum Anzeigen des Warenkorbs
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "<h3>🛒 Dein Warenkorb</h3>";

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    cart.forEach((item, index) => {
        cartContainer.innerHTML += `<p>${item.name} - ${item.price.toFixed(2)}€ <button onclick="removeFromCart(${index})">❌</button></p>`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartContainer.innerHTML += `<h4>Gesamt: ${total.toFixed(2)}€</h4>`;
    cartContainer.innerHTML += `<button onclick="checkout()">🛍️ Zur Kasse</button>`;
}

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout-Funktion (PayPal-Integration möglich)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// Automatisches Laden des Warenkorbs beim Öffnen der Seite
document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});