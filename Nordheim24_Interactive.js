// Produkt-Datenbank
const products = [
    { id: 1, name: "Frische Brötchen", price: 2.20 },
    { id: 2, name: "Milch", price: 2.50 },
    { id: 3, name: "Äpfel (1kg)", price: 3.00 }
];

// Warenkorb (Mengen basierend)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Produkt zum Warenkorb hinzufügen
function addToCart(productId) {
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value) || 1;
    const product = products.find(p => p.id === productId);
    
    if (product) {
        let cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
}

// Warenkorb aktualisieren
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
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} - ${item.price.toFixed(2)}€ x ${item.quantity}</span>
                <button onclick="removeFromCart(${index})">❌</button>
            </div>`;
    });

    document.getElementById("total").innerText = total.toFixed(2) + "€";
}

// Produkt aus dem Warenkorb entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Zahlung per PayPal
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// Warenkorb automatisch anzeigen
document.addEventListener("DOMContentLoaded", updateCartDisplay);