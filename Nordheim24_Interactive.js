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

// Funktion zum Anzeigen des Warenkorbs
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "<h3>🛒 Dein Warenkorb</h3>";

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <p>${item.name} - ${item.price.toFixed(2)}€ 
            <button onclick="removeFromCart(${index})">❌</button></p>`;
    });

    cartContainer.innerHTML += `<h4>Gesamt: ${total.toFixed(2)}€</h4>`;
}

// Funktion zum Entfernen eines Produkts aus dem Warenkorb
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// **Zahlungsmethoden**
function checkoutWithPaypal() {
    alert("Du wirst zur PayPal-Zahlung weitergeleitet.");
    window.location.href = "https://www.paypal.com/de/home";
}

function checkoutWithCard() {
    alert("Gib deine Kreditkartendaten ein.");
}

function checkoutWithNFC() {
    alert("NFC-Zahlung aktiviert! Halte dein Gerät an das Terminal.");
}

// Automatisches Laden des Warenkorbs beim Öffnen der Seite
document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});