// assets/js/product.js

function getProductSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("product");
}

async function loadProduct() {
    const slug = getProductSlug();
    if (!slug) {
        console.log("No product slug in URL");
        return;
    }

    try {
        const res = await fetch("data/products.json");
        if (!res.ok) {
            console.error("Failed to fetch products.json:", res.status);
            return;
        }
        const products = await res.json();

        const product = products.find(p => p.slug === slug);
        if (!product) {
            console.log("Product not found for slug:", slug);
            return;
        }

        injectProductData(product);
        updateBreadcrumbForProduct(product);
    } catch (error) {
        console.error("Error loading product:", error);
    }
}

function injectProductData(product) {

    // SEO Title
    if (product.seoTitle) {
        document.title = product.seoTitle;
    }

    // SEO Description
    if (product.seoDescription) {
        const metaDesc = document.getElementById("meta-description");
        if (metaDesc) {
            metaDesc.setAttribute("content", product.seoDescription);
        }
    }

    // Title
    document.getElementById("product-title").textContent = product.seoTitle;

    // Short description
    /*document.getElementById("product-short-description").textContent =
        product.shortDescription;*/

    // Long description
    document.getElementById("product-long-description").textContent =
        product.longDescription;

    // Pack info
    document.getElementById("product-pack").textContent = product.packInfo;

    /*
    document.getElementById("product-price").textContent =
        `${product.currency} ${product.price}`;*/

    // Meta
    document.getElementById("product-brand").textContent = product.brand;
    document.getElementById("product-item-form").textContent = product.itemForm;
    document.getElementById("product-variety").textContent = product.teaVariety;
    document.getElementById("product-unit-count").textContent = product.unitCount;

    // Rating
    document.getElementById("product-review-count").textContent =
        `(${product.reviewCount})`;

    document.getElementById("product-stars").textContent =
        "★".repeat(Math.round(product.rating));


    // Gallery
    const mainImage = document.getElementById("product-main-image");
    mainImage.src = product.galleryImages[0];
    mainImage.alt = product.name;

    const thumbs = document.querySelector(".product-thumbnails");
    product.galleryImages.forEach(img => {
        const t = document.createElement("img");
        t.src = img;
        t.alt = product.name;
        thumbs.appendChild(t);
    });

    enableGalleryInteraction();

    // Features
    /*const features = document.getElementById("product-features");
    product.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        features.appendChild(li);
    });*/

}

function updateBreadcrumbForProduct(product) {
    fetch("data/categories.json")
        .then(res => {
            if (!res.ok) {
                console.error("Failed to fetch categories.json:", res.status);
                return;
            }
            return res.json();
        })
        .then(categories => {
            if (!categories) return;
            categories.forEach(main => {
                main.subCategories.forEach(sub => {
                    if (sub.slug === product.subCategory) {

                        document.getElementById("breadcrumb-main-category").innerHTML =
                            `<a href="products.html">${main.title}</a>`;

                        document.getElementById("breadcrumb-sub-category").innerHTML =
                            `<a href="products.html?category=${sub.slug}">
                                ${sub.title}
                             </a>`;
                    }
                });
            });
        })
        .catch(error => console.error("Error loading categories:", error));

    const productEl = document.getElementById("breadcrumb-product");
    productEl.textContent = product.name;
    productEl.classList.remove("hidden");
}


// Gallery interaction
function enableGalleryInteraction() {
    const mainImage = document.getElementById("product-main-image");
    const thumbnails = document.querySelectorAll(".product-thumbnails img");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
            mainImage.src = thumb.src;
            mainImage.alt = thumb.alt;
        });
    });
}
document.addEventListener("DOMContentLoaded", loadProduct);
