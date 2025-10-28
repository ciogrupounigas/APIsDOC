const links = document.querySelectorAll(".sidebar nav ul li a");
const content = document.getElementById("markdown-content");
let currentIndex = 0;

// Cargar archivo Markdown
async function loadMarkdown(file) {
  const response = await fetch(file);
  const text = await response.text();
  content.innerHTML = marked.parse(text);
}

// Evento click en los links del sidebar
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
  if (currentIndex > 0) {
    links[currentIndex - 1].click();
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < links.length - 1) {
    links[currentIndex + 1].click();
  }
});

// Cargar el primer archivo por defecto
window.addEventListener("DOMContentLoaded", () => {
  links[0].click();
});
