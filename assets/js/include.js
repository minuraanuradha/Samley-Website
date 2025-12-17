// js/include.js

async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Load components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#navbar", "/components/navbar.html");
  loadComponent("#footer", "/components/footer.html");
});
