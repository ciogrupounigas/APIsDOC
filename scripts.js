const links = document.querySelectorAll(".sidebar nav ul li a");
const content = document.getElementById("markdown-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const themeToggle = document.getElementById("theme-toggle");
const hljsTheme = document.getElementById("hljs-theme");

const files = Array.from(links).map(link => link.dataset.file);
let currentIndex = 0;

// Cargar Markdown y aplicar Highlight.js
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

// Cambiar enlace activo
function updateActiveLink() {
  links.forEach(link => link.classList.remove("active"));
  links[currentIndex].classList.add("active");
}

// Eventos de sidebar
links.forEach((link, index) => {
  link.addEventListener("click", e => {
    e.preventDefault();
    currentIndex = index;
    updateActiveLink();
    loadMarkdown(link.dataset.file);
  });
});

// Paginación
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

// ======== Cambio de tema ========
themeToggle.addEventListener("click", () => {
  const body = document.body;
  const isDark = body.classList.toggle("dark");

  // Cambiar ícono
  themeToggle.textContent = isDark ? "☀️" : "🌙";

  // Cambiar tema de Highlight.js
  hljsTheme.href = isDark
    ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css"
    : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";

  // Guardar preferencia
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Cargar tema guardado
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
  hljsTheme.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css";
}

// Cargar primera sección
loadMarkdown(files[0]);
