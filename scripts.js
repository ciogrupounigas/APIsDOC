const links = document.querySelectorAll(".sidebar nav ul li a");
const content = document.getElementById("markdown-content");
let currentIndex = 0;

// Función para cargar un archivo Markdown
async function loadMarkdown(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("No se pudo cargar el archivo");
    const text = await response.text();
    content.innerHTML = marked.parse(text);
  } catch (err) {
    content.innerHTML = `<p style="color:red;">Error al cargar el contenido: ${err.message}</p>`;
  }
}

// Manejo de clics en los enlaces del sidebar
links.forEach((link, index) => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    currentIndex = index;
    loadMarkdown(link.getAttribute("data-file"));
  });
});

// Botones de paginación
document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) links[currentIndex - 1].click();
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < links.length - 1) links[currentIndex + 1].click();
});

// Cargar la primera página al inicio
window.addEventListener("DOMContentLoaded", () => {
  links[0].click();
});
