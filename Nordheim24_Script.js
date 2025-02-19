const products = {
    "Brot": [{ id: 1, name: "Brötchen", price: 2.20 }],
    "Milch": [{ id: 4, name: "Frische Milch", price: 2.50 }],
    "Grundnahrungsmittel": [{ id: 7, name: "Reis", price: 2.00 }],
    "Getränke": [{ id: 11, name: "Wasser", price: 1.00 }],
    "Obst_Gemuese": [{ id: 15, name: "Äpfel", price: 3.00 }],
    "Fleisch": [{ id: 18, name: "Hähnchenbrust", price: 6.00 }],
    "TK": [{ id: 20, name: "TK-Gemüse", price: 2.50 }],
    "Konserven": [{ id: 22, name: "Dosensuppe", price: 2.50 }],
    "Snacks": [{ id: 24, name: "Schokolade", price: 2.00 }],
    "Hygiene": [{ id: 26, name: "Zahnpasta", price: 2.50 }]
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadProducts(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (products[category]) {
        products[category].forEach(product => {
            let productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <p>${product.name} - ${product.price.toFixed(2)}€</p>
                <input type="number" id="qty-${product.id}" value="1" min="1">
                <button onclick="addToCart(${product.id})">🛒 In den Warenkorb</button>
            `;
            productList.appendChild(productDiv);
        });
    } else {
        productList.innerHTML = "<p>Keine Produkte in dieser Kategorie gefunden.</p>";
    }
}

function addToCart(productId) {
    let quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    let item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

document.addEventListener("DOMContentLoaded", updateCartCount);