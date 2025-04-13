document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary h3");

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartContainer.innerHTML = "";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const price = typeof item.price === "string"
                ? parseFloat(item.price.replace("$", ""))
                : item.price || 0;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <h3>${item.title || "Unknown Item"}</h3>
                <p class="price">Price: $${price.toFixed(2)}</p>
                <input type="number" class="quantity" value="1" min="1" data-index="${index}">
                <button class="remove-item" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
            totalPrice += price;
        });

        cartSummary.textContent = `Total: $${totalPrice.toFixed(2)}`;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                removeItem(index);
            });
        });

        document.querySelectorAll(".quantity").forEach(input => {
            input.addEventListener("input", () => {
                updateTotalPrice();
            });
        });
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateTotalPrice() {
        let totalPrice = 0;

        document.querySelectorAll(".cart-item").forEach(item => {
            const quantity = parseInt(item.querySelector(".quantity").value) || 1;
            const priceText = item.querySelector(".price").textContent;
            const price = parseFloat(priceText.replace("Price: $", "")) || 0;

            totalPrice += price * quantity;
        });

        cartSummary.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    updateCartDisplay();
});
