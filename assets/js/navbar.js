// js/navbar.js

async function loadCategories() {
  try {
    const res = await fetch("/data/categories.json");
    if (!res.ok) throw new Error("Failed to load categories");
    const categories = await res.json();

    categories.forEach(main => {
      const group = document.querySelector(
        `.dropdown-group[data-category="${main.id}"] .dropdown-list`
      );

      if (!group) return;

      main.subCategories.forEach(sub => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `/products.html?category=${sub.slug}`;
        a.textContent = sub.title;

        li.appendChild(a);
        group.appendChild(li);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadCategories);

