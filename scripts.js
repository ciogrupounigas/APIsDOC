const links = document.querySelectorAll(".sidebar nav ul li a");
const content = document.getElementById("markdown-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const files = Array.from(links).map(link => link.dataset.file);
let currentIndex = 0;

// Cargar Markdown con Highlight.js
async function loadMarkdown(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("No se pudo cargar el archivo");
    const text = await response.text();

    content.innerHTML = marked.parse(text);
    document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
  } catch (err) {
    content.innerHTML = `<p style="color:red;">Error al cargar el contenido: ${err.message}</p>`;
  }
}

// Manejar clicks en el sidebar
links.forEach((link, index) => {
  link.addEventListener("click", e => {
    e.preventDefault();
    currentIndex = index;
    updateActiveLink();
    loadMarkdown(link.dataset.file);
  });
});

// Botones de paginación
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateActiveLink();
    loadMarkdown(files[currentIndex]);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < files.length - 1) {
    currentIndex++;
    updateActiveLink();
    loadMarkdown(files[currentIndex]);
  }
});

// Actualizar el estado visual de los enlaces
function updateActiveLink() {
  links.forEach(link => link.classList.remove("active"));
  links[currentIndex].classList.add("active");
}

// Cargar la primera sección al inicio
loadMarkdown(files[0]);
