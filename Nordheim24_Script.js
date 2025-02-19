// 📌 Komplette Produkt-Datenbank mit Kategorien
const products = {
    "Brot": [
        { id: 1, name: "Brötchen", price: 2.20 },
        { id: 2, name: "Toastbrot", price: 1.50 },
        { id: 3, name: "Roggenbrot", price: 3.00 }
    ],
    "Milch": [
        { id: 4, name: "Frische Milch", price: 2.50 },
        { id: 5, name: "Joghurt", price: 1.80 },
        { id: 6, name: "Käse", price: 4.50 }
    ],
    "Grundnahrungsmittel": [
        { id: 7, name: "Reis", price: 2.00 },
        { id: 8, name: "Nudeln", price: 1.70 },
        { id: 9, name: "Mehl", price: 1.20 },
        { id: 10, name: "Zucker", price: 1.00 }
    ],
    "Getränke": [
        { id: 11, name: "Wasser", price: 1.00 },
        { id: 12, name: "Orangensaft", price: 2.50 },
        { id: 13, name: "Kaffee", price: 5.00 },
        { id: 14, name: "Bier", price: 3.00 }
    ],
    "Obst_Gemuese": [
        { id: 15, name: "Äpfel", price: 3.00 },
        { id: 16, name: "Bananen", price: 2.20 },
        { id: 17, name: "Tomaten", price: 2.50 }
    ],
    "Fleisch": [
        { id: 18, name: "Hähnchenbrust", price: 6.00 },
        { id: 19, name: "Rindersteak", price: 8.50 }
    ],
    "TK": [
        { id: 20, name: "TK-Gemüse", price: 2.50 },
        { id: 21, name: "Pizza", price: 3.50 }
    ],
    "Konserven": [
        { id: 22, name: "Dosensuppe", price: 2.50 },
        { id: 23, name: "Mais in Dose", price: 1.50 }
    ],
    "Snacks": [
        { id: 24, name: "Schokolade", price: 2.00 },
        { id: 25, name: "Chips", price: 1.80 }
    ],
    "Hygiene": [
        { id: 26, name: "Zahnpasta", price: 2.50 },
        { id: 27, name: "Shampoo", price: 3.00 }
    ]
};

// 📌 Warenkorb in localStorage speichern (bleibt beim Neuladen erhalten)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 📌 Produkte aus der jeweiligen Kategorie auf der Produktseite anzeigen
function loadProducts(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Zurücksetzen der Liste

    if (products[category]) {
        products[category].forEach(product => {
            let productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <p>${product.name} - ${product.price.toFixed(2)}€</p>
                <input type="number" id="qty-${product.id}" value="1" min="1" max="10">
                <button onclick="addToCart(${product.id})">🛒 In den Warenkorb</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>Keine Produkte in dieser Kategorie gefunden.</p>";
    }
}

// 📌 Produkt zum Warenkorb hinzufügen (mit variabler Menge)
function addToCart(productId) {
    const category = Object.keys(products).find(cat => 
        products[cat].some(p => p.id === productId)
    );
    const product = products[category].find(p => p.id === productId);

    let quantity = parseInt(document.getElementById(`qty-${product.id}`).value);
    let existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity; // Menge erhöhen
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} x${quantity} wurde dem Warenkorb hinzugefügt!`);
}

// 📌 Warenkorb-Anzeige aktualisieren
function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = count;
}

// 📌 Warenkorb-Seite anzeigen
function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        cartContainer.innerHTML += `
            <p>${item.name} - ${item.quantity} Stück - ${(item.price * item.quantity).toFixed(2)}€
            <button onclick="removeFromCart(${index})">❌ Entfernen</button></p>
        `;
    });

    cartContainer.innerHTML += `<h3>Gesamt: ${total.toFixed(2)}€</h3>`;
}

// 📌 Produkt aus dem Warenkorb entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// 📌 Zur Kasse gehen (PayPal & Zahlungssysteme)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// 📌 Beim Laden der Seite den Warenkorb-Status aktualisieren
document.addEventListener("DOMContentLoaded", updateCartCount);