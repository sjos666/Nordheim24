// Produkt-Datenbank
const products = {
    "Brot": [
        { id: 1, name: "Brötchen", price: 2.20 },
        { id: 2, name: "Baguette", price: 2.50 }
    ],
    "Milch": [
        { id: 3, name: "Milch", price: 2.50 },
        { id: 4, name: "Joghurt", price: 1.50 }
    ],
    "Getränke": [
        { id: 5, name: "Wasser", price: 1.00 },
        { id: 6, name: "Cola", price: 1.50 }
    ],
    "Obst_Gemuese": [
        { id: 7, name: "Apfel", price: 0.80 },
        { id: 8, name: "Banane", price: 0.60 }
    ],
    "Fleisch": [
        { id: 9, name: "Hähnchenbrust", price: 5.00 },
        { id: 10, name: "Salami", price: 3.50 }
    ],
    "TK": [
        { id: 11, name: "TK-Gemüse", price: 3.00 },
        { id: 12, name: "Pizza", price: 4.50 }
    ],
    "Konserven": [
        { id: 13, name: "Bohnendose", price: 1.20 },
        { id: 14, name: "Eintopf", price: 2.80 }
    ],
    "Snacks": [
        { id: 15, name: "Schokolade", price: 1.50 },
        { id: 16, name: "Chips", price: 2.00 }
    ],
    "Hygiene": [
        { id: 17, name: "Shampoo", price: 3.00 },
        { id: 18, name: "Seife", price: 1.00 }
    ]
};

// Warenkorb
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// URL Parameter für Kategorie auslesen
function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("kategorie");

    if (category && products[category]) {
        document.getElementById("category-title").innerText = category.replace("_", " & ");
        loadProducts(category);
    } else {
        document.getElementById("product-list").innerHTML = "<p>Keine Produkte gefunden.</p>";
    }
}

// Produkte anzeigen
function loadProducts(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products[category].forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <p>${product.name} - ${product.price.toFixed(2)}€</p>
            <input type="number" id="qty-${product.id}" value="1" min="1">
            <button onclick="addToCart(${product.id}, '${category}')">🛒 In den Warenkorb</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Produkt zum Warenkorb hinzufügen
function addToCart(productId, category) {
    let quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    let item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        let product = products[category].find(p => p.id === productId);
        if (product) {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Warenkorb-Anzeige aktualisieren
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Warenkorb-Seite aktualisieren
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "<h2>🛒 Dein Warenkorb</h2>";

    if (cart.length === 0) {
        cartContainer.innerHTML += "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <p>${item.name} - ${item.quantity} Stück - ${(item.price * item.quantity).toFixed(2)}€ 
            <button onclick="removeFromCart(${index})">❌</button></p>
        `;
    });

    cartContainer.innerHTML += `<h3>Gesamt: ${total.toFixed(2)}€</h3>`;
    cartContainer.innerHTML += `<button onclick="checkout()">🛍️ Zur Kasse</button>`;
}

// Produkt aus Warenkorb entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout-Funktion (PayPal-Integration folgt)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// EventListener für Warenkorb
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    if (document.getElementById("cart-container")) {
        updateCartDisplay();
    }
});