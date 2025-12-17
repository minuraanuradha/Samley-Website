// js/products.js

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

async function loadProducts() {
  const categorySlug = getCategoryFromURL();
  if (!categorySlug) return;

  const res = await fetch("data/products.json");
  const products = await res.json();

  const filtered = products.filter(
    p => p.subCategory === categorySlug
  );

  renderProducts(filtered);
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
