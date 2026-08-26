const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const htmlElement = document.documentElement;

// Função para aplicar o tema e atualizar a interface
function applyTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Claro';
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Escuro';
  }
}

// Alterna entre escuro e claro
function toggleTheme() {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
}

// Carrega a preferência salva do usuário ao abrir a página
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Evento de clique no botão
themeToggleBtn.addEventListener('click', toggleTheme);
