const products = {
    "Brot_Backwaren": [
        { id: 1, name: "Brötchen", price: 2.20 },
        { id: 2, name: "Baguette", price: 2.50 }
    ],
    "Milchprodukte": [
        { id: 3, name: "Milch", price: 2.50 },
        { id: 4, name: "Joghurt", price: 1.50 }
    ],
    "Getraenke": [
        { id: 5, name: "Wasser", price: 1.00 },
        { id: 6, name: "Cola", price: 1.50 }
    ]
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