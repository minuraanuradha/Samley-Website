// js/include.js

async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);
  if (!container) return;

  const res = await fetch(filePath);
  container.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#navbar", "components/navbar.html");

  await import("../js/navbar.js");

  await loadComponent("#footer", "components/footer.html");
});
