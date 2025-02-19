// Produkt-Datenbank
const products = [
    { id: 1, name: "Frische Brötchen", price: 2.20 },
    { id: 2, name: "Milch", price: 2.50 },
    { id: 3, name: "Äpfel (1kg)", price: 3.00 }
];

// Warenkorb-Array (wird im localStorage gespeichert)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Produkt zum Warenkorb hinzufügen (inkl. Menge)
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        for (let i = 0; i < quantity; i++) {
            cart.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Warenkorb anzeigen
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    if (!cartContainer) return;

    cartContainer.innerHTML = "<h3>🛒 Dein Warenkorb</h3>";

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        document.getElementById("total").innerText = "0.00€";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <p>${item.name} - ${item.price.toFixed(2)}€ <button onclick="removeFromCart(${index})">❌</button></p>`;
    });

    document.getElementById("total").innerText = total.toFixed(2) + "€";
}

// Produkt aus dem Warenkorb entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Bezahlung mit Kreditkarte (Platzhalter für Stripe)
function payWithCard() {
    alert("Kreditkartenzahlung folgt...");
}

// Bezahlung mit NFC (Platzhalter)
function payWithNFC() {
    alert("NFC-Zahlung folgt...");
}

// Automatische Anzeige des Warenkorbs
document.addEventListener("DOMContentLoaded", updateCartDisplay);