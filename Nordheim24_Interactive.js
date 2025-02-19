const products = [
    { id: 1, name: "Frische Brötchen", price: 2.20 },
    { id: 2, name: "Milch", price: 2.50 },
    { id: 3, name: "Äpfel (1kg)", price: 3.00 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
}

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

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// ✅ **PayPal Checkout**
function checkoutWithPaypal() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert("Zahlung erfolgreich! Danke, " + details.payer.name.given_name);
                cart = [];
                localStorage.removeItem("cart");
                updateCartDisplay();
            });
        }
    }).render("body");
}

// ✅ **Kreditkartenzahlung via Stripe**
const stripe = Stripe("DEIN_STRIPE_PUBLIC_KEY");

function checkoutWithCard() {
    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            amount: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)
        })
    })
    .then(res => res.json())
    .then(session => {
        stripe.redirectToCheckout({ sessionId: session.id });
    })
    .catch(err => console.error(err));
}

// ✅ **NFC-Zahlung**
function checkoutWithNFC() {
    alert("NFC-Zahlung aktiviert! Halte dein Gerät an das Terminal.");
}

// Automatisches Laden des Warenkorbs
document.addEventListener("DOMContentLoaded", function() {
    updateCartDisplay();
});