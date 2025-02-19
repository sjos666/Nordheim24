// Produkt-Datenbank
const products = [
    { id: 1, name: "Frische Brötchen", price: 2.20 },
    { id: 2, name: "Milch", price: 2.50 },
    { id: 3, name: "Äpfel (1kg)", price: 3.00 }
];

// Warenkorb-Array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funktion zum Hinzufügen eines Produkts
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} wurde in den Warenkorb gelegt!`);
    }
}

// Warenkorb auf cart.html anzeigen
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        document.getElementById("total").innerText = "0.00";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `<p>${item.name} - ${item.price.toFixed(2)}€ <button onclick="removeFromCart(${index})">❌</button></p>`;
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

// Produkt entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout-Funktion (noch keine Zahlung)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// Automatische Warenkorb-Anzeige beim Laden der Seite
document.addEventListener("DOMContentLoaded", updateCartDisplay);