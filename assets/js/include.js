// js/include.js

async function loadComponent(selector, filePath, callback) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    container.innerHTML = await response.text();
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#navbar", "/components/navbar.html", () => {
    import("../js/navbar.js");
  });

  loadComponent("#footer", "/components/footer.html");
});
