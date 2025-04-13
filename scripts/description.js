document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        document.getElementById("product-title").textContent = "Product Not Found";
        return;
    }

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("product-image").src = product.image;
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;

            document.getElementById("add-to-cart").addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push({ 
                    id: product.id, 
                    title: product.title, 
                    price: `$${product.price.toFixed(2)}` 
                });
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product added to cart!");
            });
        })
        .catch(error => console.error("Error fetching product details:", error));

    const cartBtn = document.querySelector(".cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }
});


