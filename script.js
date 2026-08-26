const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Altera o tema e atualiza o ícone
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let newTheme = 'light';

  if (currentTheme !== 'dark') {
    newTheme = 'dark';
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }

  document.documentElement.setAttribute('data-theme', newTheme);
}

// Evento de clique no botão
themeToggleBtn.addEventListener('click', toggleTheme);
