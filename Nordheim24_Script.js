const products = {
    "Brot": ["Brot", "Backwaren"],
    "Milch": ["Milch", "Milchprodukte", "Eier"],
    "Grundnahrungsmittel": ["Teigwaren", "Reis", "Hülsenfrüchte", "Mehl", "Zucker", "Öl", "Salz"],
    "Getränke": ["Wasser", "Softdrinks", "Säfte", "Kaffee", "Tee", "Bier", "Wein"],
    "Obst_Gemuese": ["Äpfel", "Bananen", "Orangen", "Zitronen", "Tomaten", "Gurken", "Zwiebeln", "Paprika"],
    "Fleisch": ["Frischfleisch", "Wurstwaren"],
    "TK": ["Tiefkühlgemüse", "Tiefkühlobst", "Pizza", "Pommes", "Fischstäbchen", "Eiscreme"],
    "Konserven": ["Dosensuppen", "Eintöpfe", "Gemüsedosen", "Mais", "Bohnen", "Erbsen", "Fertiggerichte", "Marmelade", "Honig", "Schokocreme"],
    "Snacks": ["Schokolade", "Kekse", "Gummibärchen", "Chips", "Salzgebäck", "Nüsse", "Trockenfrüchte"],
    "Hygiene": ["Toilettenpapier", "Taschentücher", "Zahnpasta", "Shampoo", "Seife", "Waschmittel", "Spülmittel"]
};

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function loadProducts(category) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    if (products[category]) {
        products[category].forEach((item, index) => {
            productList.innerHTML += `
                <div class="product">
                    ${item} - <span id="price${index}">${(Math.random() * 5 + 1).toFixed(2)}€</span>
                    <input type="number" id="quantity${index}" value="1" min="1">
                    <button onclick="addToCart('${item}', ${index})">🛒 In den Warenkorb</button>
                </div>
            `;
        });
    } else {
        productList.innerHTML = "<p>Keine Produkte in dieser Kategorie.</p>";
    }
}

function addToCart(item, index) {
    let quantity = document.getElementById(`quantity${index}`).value;
    let price = parseFloat(document.getElementById(`price${index}`).innerText);

    if (!cart[item]) {
        cart[item] = { price: price, quantity: 0 };
    }

    cart[item].quantity += parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

function showCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    let total = 0;

    for (let item in cart) {
        cartContainer.innerHTML += `
            <p>${item} - ${cart[item].quantity} x ${cart[item].price.toFixed(2)}€ 
            <button onclick="removeFromCart('${item}')">❌</button></p>`;
        total += cart[item].quantity * cart[item].price;
    }

    document.getElementById("total").innerText = total.toFixed(2) + "€";
}

function removeFromCart(item) {
    delete cart[item];
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

function checkout() {
    alert("PayPal & Kreditkarte werden bald integriert!");
}

document.addEventListener("DOMContentLoaded", updateCartDisplay);