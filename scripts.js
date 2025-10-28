// === Inicialización de Highlight.js ===
document.querySelectorAll("pre code").forEach(el => hljs.highlightElement(el));

// === Secciones colapsables ===
document.querySelectorAll(".collapsible > span").forEach(header => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("open");
  });
});

// === Botones de Copiar ===
document.querySelectorAll(".copy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const code = button.nextElementSibling.querySelector("code").innerText;
    navigator.clipboard.writeText(code);
    button.classList.add("copied");
    setTimeout(() => button.classList.remove("copied"), 2000);
  });
});

// === Modo Oscuro / Claro ===
const themeBtn = document.getElementById("theme-toggle");
const hljsTheme = document.getElementById("hljs-theme");

// Cargar preferencia guardada
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") setLightTheme();
else setDarkTheme();

// Alternar tema al hacer clic
themeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    setDarkTheme();
    localStorage.setItem("theme", "dark");
  } else {
    setLightTheme();
    localStorage.setItem("theme", "light");
  }
});

// Funciones
function setLightTheme() {
  document.body.classList.add("light");
  hljsTheme.href =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";
  themeBtn.textContent = "☀️";
}

function setDarkTheme() {
  document.body.classList.remove("light");
  hljsTheme.href =
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css";
  themeBtn.textContent = "🌙";
}
