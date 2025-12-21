// assets/js/include.js

const DEBUG_INCLUDE = true; // 🔴 set false for production

function INCLUDE_LOG(message, type = "info") {
  if (!DEBUG_INCLUDE) return;

  const styles = {
    info: "color:#2563eb; font-weight:500",
    success: "color:#16a34a; font-weight:500",
    warn: "color:#ca8a04; font-weight:500",
    error: "color:#dc2626; font-weight:600"
  };

  console.log(`%c[Include] ${message}`, styles[type]);
}


async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);

  if (!container) {
    INCLUDE_LOG(`Container not found: ${selector}`, "warn");
    return;
  }

  try {
    INCLUDE_LOG(`Loading component: ${filePath}`, "info");

    const res = await fetch(filePath);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const html = await res.text();
    container.innerHTML = html;

    INCLUDE_LOG(`Component loaded successfully: ${filePath}`, "success");
  } catch (err) {
    INCLUDE_LOG(`Failed to load ${filePath} → ${err.message}`, "error");
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  INCLUDE_LOG("DOMContentLoaded fired", "info");

  // Navbar
  await loadComponent("#navbar", "components/navbar.html");

  // Navbar JS
  INCLUDE_LOG("Injecting navbar.js", "info");
  const script = document.createElement("script");
  script.src = "assets/js/navbar.js";
  script.onload = () => INCLUDE_LOG("navbar.js loaded", "success");
  script.onerror = () => INCLUDE_LOG("navbar.js failed to load", "error");
  document.head.appendChild(script);

  // Footer
  await loadComponent("#footer", "components/footer.html");

  // Instagram (HTML only)
  await loadComponent("#instagram-section", "components/instagram.html");

  // Explore Our Collections (HTML only)
  await loadComponent("#collections-section", "components/collections-highlight.html");

  INCLUDE_LOG("All components processed", "success");
});

