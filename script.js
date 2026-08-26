const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

function toggleTheme() {
  // Verifica qual tema está ativo no atributo do html
  const currentTheme = htmlElement.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  } else {
    htmlElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '🌙';
  }
}

// Escuta o clique no botão
themeToggleBtn.addEventListener('click', toggleTheme);
