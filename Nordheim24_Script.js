// Produkt-Datenbank mit Kategorien und Unterkategorien
const categories = {
    "Brot & Backwaren": {
        "Brötchen": [{ id: 1, name: "Kornbrötchen", price: 2.20 }, { id: 2, name: "Laugenbrötchen", price: 2.50 }],
        "Baguette": [{ id: 3, name: "Weizenbaguette", price: 3.00 }]
    },
    "Milch & Milchprodukte": {
        "Milch": [{ id: 4, name: "Frische Milch", price: 1.50 }],
        "Joghurt": [{ id: 5, name: "Erdbeerjoghurt", price: 1.20 }]
    }
};

// Warenkorb
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Kategorien anzeigen
function loadCategories() {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    Object.keys(categories).forEach(category => {
        let categoryLink = document.createElement("a");
        categoryLink.href = `unterkategorie.html?kategorie=${encodeURIComponent(category)}`;
        categoryLink.innerText = category;
        categoryList.appendChild(categoryLink);
        categoryList.appendChild(document.createElement("br"));
    });
}

// Unterkategorien anzeigen
function loadSubCategories() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("kategorie");

    if (!categories[category]) {
        document.getElementById("sub-category-list").innerHTML = "<p>Keine Unterkategorien gefunden.</p>";
        return;
    }

    document.getElementById("category-title").innerText = category;

    const subCategoryList = document.getElementById("sub-category-list");
    subCategoryList.innerHTML = "";

    Object.keys(categories[category]).forEach(subCategory => {
        let subCategoryLink = document.createElement("a");
        subCategoryLink.href = `produkte.html?kategorie=${encodeURIComponent(category)}&unterkategorie=${encodeURIComponent(subCategory)}`;
        subCategoryLink.innerText = subCategory;
        subCategoryList.appendChild(subCategoryLink);
        subCategoryList.appendChild(document.createElement("br"));
    });
}

// Produkte anzeigen
function loadProducts() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("kategorie");
    const subCategory = params.get("unterkategorie");

    if (!categories[category] || !categories[category][subCategory]) {
        document.getElementById("product-list").innerHTML = "<p>Keine Produkte gefunden.</p>";
        return;
    }

    document.getElementById("category-title").innerText = `${category} - ${subCategory}`;

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    categories[category][subCategory].forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <p>${product.name} - ${product.price.toFixed(2)}€</p>
            <label for="qty-${product.id}">Menge:</label>
            <input type="number" id="qty-${product.id}" value="1" min="1">
            <button onclick="addToCart(${product.id}, '${category}', '${subCategory}')">🛒 In den Warenkorb</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Produkt in den Warenkorb legen
function addToCart(productId, category, subCategory) {
    let quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    let item = cart.find(p => p.id === productId);

    if (item) {
        item.quantity += quantity;
    } else {
        let product = categories[category][subCategory].find(p => p.id === productId);
        if (product) {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Warenkorb Anzahl aktualisieren
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
            <button onclick="removeFromCart(${index})">❌ Entfernen</button></p>
        `;
    });

    cartContainer.innerHTML += `<h3>Gesamt: ${total.toFixed(2)}€</h3>`;
    cartContainer.innerHTML += `<button onclick="checkout()">🛍️ Zur Kasse</button>`;
}

// Produkt entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Checkout-Funktion (PayPal-Integration folgt)
function checkout() {
    alert("Zurzeit ist nur eine Vorschau möglich. PayPal-Integration folgt.");
}

// Initialisierung
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    if (document.getElementById("category-list")) {
        loadCategories();
    }
    if (document.getElementById("sub-category-list")) {
        loadSubCategories();
    }
    if (document.getElementById("product-list")) {
        loadProducts();
    }
    if (document.getElementById("cart-container")) {
        updateCartDisplay();
    }
});