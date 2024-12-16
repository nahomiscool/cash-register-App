const price = document.getElementById('price-js');
const money = document.getElementById('moneyTaken-js');
const message = document.getElementById('message-js');
const submit = document.getElementById('submit-js');
const vault = document.getElementById('vault-js');
const detail = document.getElementById('detail');
const itemPrice = document.querySelectorAll('.item-price');
const cartItem = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');
const total = document.getElementById('total-js');
const check = document.querySelector('.cart-section');
check.addEventListener('click', () => {
    window.location.href = "cart.html";
});
let vaultMoney = 1000; // Starting vault money
let order = null;
cartTotal = 0;
let cartItemCount = 0;

// Inventory of items
import { inventory } from "./app.js";
const cart = [];
let catNumber = 0;
// Calculate change
function calculateChange(price, moneyPaid) {
    return moneyPaid - price;
}

// Update remaining vault money
function updateVaultMoney(price) {
    return vaultMoney - price;
}

// Add event listeners to items
inventory.forEach((item, index) => {
    const element = document.getElementById(item.id);
    if (element) {
        element.addEventListener('click', () => {
            detail.innerText = `Price: $${item.price} | Model: ${item.model}`;
            price.value = item.price;
            itemPrice.innerText = `$${item.price}`;
            cart.push(item.price);
            order = index; // Track selected item
            console.log(cart);
            cartTotal += item.price;
            console.log(cartTotal);
            total.innerText = `$${cartTotal}`;
            cartItemCount++;
            cartItem.innerText = cartItemCount; 
            console.log(cartItemCount);
            price.value = cartTotal;
        });
    }
});    
// Handle purchase submission
submit.addEventListener('click', () => {
    const priceValue = Number(price.value);
    const moneyValue = Number(money.value);

    // Validation: Ensure an item is selected
    if (order === null) {
        message.innerText = "Please select an item to purchase.";
        return;
    }

    // Handle insufficient funds
    if (moneyValue < cartTotal) {
        message.innerText = "Not enough money!";
        return;
    }
    // Handle successful purchase
    const change = calculateChange(cartTotal, moneyValue);
    vaultMoney = updateVaultMoney(cartTotal);

    if (moneyValue > cartTotal) {
        message.innerText = `Purchase successful! Your change is $${change}.`;
    } else {
        message.innerText = "Purchase successful! Exact amount paid.";
    }
    // Update vault display
    vault.innerText = `Vault money: $${vaultMoney}`;
    // Reset order
    order = null;
});
