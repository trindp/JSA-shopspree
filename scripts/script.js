document.addEventListener("DOMContentLoaded", () => {
    const api = "https://fakestoreapi.com/products";
    const itemsContainer = document.querySelector(".items-container");
    const paginationContainer = document.querySelector(".pagination-container");

    let allProducts = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    const minPriceInput = document.getElementById("min-price");
    const maxPriceInput = document.getElementById("max-price");
    const ratingsSelect = document.getElementById("ratings");
    const searchBar = document.getElementById("search-bar");

    async function fetchProducts() {
        try {
            const response = await fetch(api);
            if (!response.ok) {
                console.log(`API request failed with status: ${response.status}`);
            }
            const products = await response.json();
            allProducts = products;
            displayProducts(products);
            setupPagination(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    function displayProducts(products) {
        itemsContainer.innerHTML = "";
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToDisplay = products.slice(startIndex, endIndex);

        productsToDisplay.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image" />
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="view-details" data-id="${product.id}">View Details</button>
            `;
            itemsContainer.appendChild(productElement);
        });

        document.querySelectorAll(".view-details").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = button.dataset.id;
                window.location.href = `description.html?id=${productId}`;
            });
        });
    }

    function setupPagination(products) {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        if (paginationContainer) {
            paginationContainer.innerHTML = "";

            if (currentPage > 1) {
                const prevButton = document.createElement("button");
                prevButton.textContent = "← Previous";
                prevButton.classList.add("pagination-btn");
                prevButton.addEventListener("click", () => {
                    currentPage--;
                    displayProducts(products);
                    setupPagination(products);
                });
                paginationContainer.appendChild(prevButton);
            }

            if (currentPage < totalPages) {
                const nextButton = document.createElement("button");
                nextButton.textContent = "Next →";
                nextButton.classList.add("pagination-btn");
                nextButton.addEventListener("click", () => {
                    currentPage++;
                    displayProducts(products);
                    setupPagination(products);
                });
                paginationContainer.appendChild(nextButton);
            }
        }
    }

    function filterProducts() {
        let filteredProducts = allProducts;

        const minPrice = parseFloat(minPriceInput?.value) || 0;
        const maxPrice = parseFloat(maxPriceInput?.value) || Infinity;
        filteredProducts = filteredProducts.filter((product) => {
            const price = parseFloat(product.price);
            return price >= minPrice && price <= maxPrice;
        });


        const searchQuery = searchBar?.value.toLowerCase() || "";
        if (searchQuery) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(searchQuery)
            );
        }

        const selectedRating = ratingsSelect?.value;
        if (selectedRating && selectedRating !== "all") {
            filteredProducts = filteredProducts.filter((product) => {
                return product.rating?.rate >= parseInt(selectedRating);
            });
        }

        displayProducts(filteredProducts);
        setupPagination(filteredProducts);
    }

    minPriceInput?.addEventListener("input", filterProducts);
    maxPriceInput?.addEventListener("input", filterProducts);
    ratingsSelect?.addEventListener("change", filterProducts);

    searchBar?.addEventListener("keyup", (e) => {
        filterProducts();
    });

    // const urlParams = new URLSearchParams(window.location.search);
    // const searchQueryFromURL = urlParams.get("search");
    // if (searchQueryFromURL && searchBar) {
    //     searchBar.value = searchQueryFromURL;
    //     filterProducts();
    // }

    fetchProducts();

    const cartBtn = document.querySelector(".cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }

    const signoutBtn = document.querySelector(".sign-out-btn");
    if (signoutBtn) {
        signoutBtn.addEventListener("click", () => {
            window.location.href = "login.html";
        });
    }
});
