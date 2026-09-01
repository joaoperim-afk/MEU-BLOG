document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTOS
  // =========================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");
  const htmlElement = document.documentElement;

  // =========================
  // APLICAR TEMA
  // =========================
  function applyTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Modo Claro";
      themeToggleBtn.setAttribute("aria-label", "Ativar modo claro");
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Modo Escuro";
      themeToggleBtn.setAttribute("aria-label", "Ativar modo escuro");
    }
  }

  // =========================
  // ALTERNAR TEMA
  // =========================
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }

  // =========================
  // TEMA SALVO
  // =========================
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  } else {
    applyTheme("light");
  }

  // =========================
  // BOTÃO DO TEMA
  // =========================
  themeToggleBtn.addEventListener("click", toggleTheme);

  // =========================
  // ANIMAÇÃO DOS CARDS
  // =========================
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // =========================
  // ROLAGEM SUAVE
  // =========================
  const navigationLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  navigationLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // =========================
  // ANIMAÇÃO AO APARECER
  // =========================
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-card");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  cards.forEach(card => {
    card.classList.add("hidden-card");
    observer.observe(card);
  });

});
