// js/include.js

async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);
  if (!container) return;

  const res = await fetch(filePath);
  container.innerHTML = await res.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#navbar", "components/navbar.html");

  // Load navbar.js as a script
  const script = document.createElement('script');
  script.src = 'assets/js/navbar.js';
  document.head.appendChild(script);

  await loadComponent("#footer", "components/footer.html");
});
