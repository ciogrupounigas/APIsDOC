const links = document.querySelectorAll(".sidebar a");
const content = document.getElementById("markdown-content");
const themeToggle = document.getElementById("theme-toggle");
let currentIndex = 0;

// Cargar Markdown
async function loadMarkdown(file) {
  try {
    const response = await fetch(file);
    const text = await response.text();
    content.innerHTML = marked.parse(text);
    document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
  } catch {
    content.innerHTML = "<p style='color:red'>Error al cargar el archivo.</p>";
  }
}

// Sidebar
links.forEach((link, index) => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    currentIndex = index;
    loadMarkdown(link.getAttribute("data-file"));
  });
});

// Paginación
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) links[currentIndex - 1].click();
});
document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < links.length - 1) links[currentIndex + 1].click();
});

// AutoResponse: Consola de prueba
document.getElementById("api-form").addEventListener("submit", async e => {
  e.preventDefault();
  const endpoint = document.getElementById("endpoint").value;
  const method = document.getElementById("method").value;
  const body = document.getElementById("body").value.trim();
  const responseBox = document.getElementById("response-content");

  responseBox.textContent = "Enviando solicitud...";
  
  try {
    const options = { method };
    if (method === "POST" && body) {
      options.headers = { "Content-Type": "application/json" };
      options.body = body;
    }

    const res = await fetch(endpoint, options);
    const data = await res.json();

    responseBox.textContent = JSON.stringify(data, null, 2);
    hljs.highlightElement(responseBox);
  } catch (err) {
    responseBox.textContent = `Error: ${err.message}`;
  }
});

// Tema claro/oscuro
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "🌙 Modo Oscuro"
    : "☀️ Modo Claro";
});

// Cargar por defecto
window.addEventListener("DOMContentLoaded", () => {
  links[0].click();
});
