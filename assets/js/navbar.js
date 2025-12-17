// js/navbar.js

async function loadCategories() {
  const res = await fetch("/data/categories.json");
  const categories = await res.json();

  categories.forEach(main => {
    const list = document.querySelector(
      `.dropdown-group[data-category="${main.id}"] .dropdown-list`
    );

    if (!list) return;

    main.subCategories.forEach(sub => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = `/products.html?category=${sub.slug}`;
      a.textContent = sub.title;

      li.appendChild(a);
      list.appendChild(li);
    });
  });
}

// ✅ run immediately (navbar already injected)
loadCategories();
