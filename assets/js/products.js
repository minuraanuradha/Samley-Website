// js/products.js

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category");
}

async function loadProducts() {
    const categorySlug = getCategoryFromURL();
    const emptyState = document.getElementById("products-empty");
    const grid = document.getElementById("products-grid");

    if (!categorySlug) {
        emptyState.textContent = "Please select a product category.";
        emptyState.classList.remove("hidden");
        return;
    }

    updateCategoryTitle(categorySlug);

    const res = await fetch("data/products.json");
    const products = await res.json();

    const filtered = products.filter(
        p => p.subCategory === categorySlug
    );

    if (filtered.length === 0) {
        emptyState.textContent = "No products found in this category.";
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");
    renderProducts(filtered);
}


async function updateCategoryTitle(categorySlug) {
    const res = await fetch("data/categories.json");
    const categories = await res.json();

    categories.forEach(main => {
        main.subCategories.forEach(sub => {
            if (sub.slug === categorySlug) {
                document.getElementById("category-title").textContent = sub.title;
            }
        });
    });
}


function renderProducts(products) {
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    grid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
      <a href="product.html?product=${product.slug}">
        <img src="${product.thumbnailImage}" alt="${product.name}">
      </a>
      <h5>${product.name}</h5>
      <p>${product.shortDescription}</p>
      <p>${product.packInfo}</p>
    `;

        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadProducts);
