document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTOS DO TEMA
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

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }

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

  // =========================
  // LÓGICA DO JOGO DA FORCA
  // =========================
  const words = [
    { word: "FLEXBOX", hint: "Modelo de layout CSS flexível" },
    { word: "ALGORITMO", hint: "Sequência de passos para resolver um problema" },
    { word: "INTERNET", hint: "Rede mundial de computadores" },
    { word: "JAVASCRIPT", hint: "Linguagem de programação para a web" },
    { word: "HARDWARE", hint: "Parte física de um computador" },
    { word: "SOFTWARE", hint: "Programas e sistemas operacionais" }
  ];

  let selectedWord = "";
  let selectedHint = "";
  let guessedLetters = [];
  let remainingLives = 6;

  const hintEl = document.querySelector("#hangman-hint span");
  const livesEl = document.getElementById("hangman-lives");
  const wordContainer = document.getElementById("hangman-word");
  const keyboardContainer = document.getElementById("hangman-keyboard");
  const messageEl = document.getElementById("hangman-message");
  const restartBtn = document.getElementById("hangman-restart");

  function initHangman() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    selectedHint = words[randomIndex].hint;
    guessedLetters = [];
    remainingLives = 6;

    if (hintEl) hintEl.textContent = selectedHint;
    if (livesEl) livesEl.textContent = remainingLives;
    if (messageEl) {
      messageEl.textContent = "";
      messageEl.style.color = "inherit";
    }

    renderWord();
    renderKeyboard();
  }

  function renderWord() {
    if (!wordContainer) return;
    wordContainer.innerHTML = "";

    let hasWon = true;

    selectedWord.split("").forEach(letter => {
      const letterSpan = document.createElement("span");
      if (guessedLetters.includes(letter)) {
        letterSpan.textContent = letter;
      } else {
        letterSpan.textContent = "";
        hasWon = false;
      }
      wordContainer.appendChild(letterSpan);
    });

    if (hasWon && selectedWord.length > 0) {
      if (messageEl) {
        messageEl.textContent = "🎉 Parabéns! Você venceu!";
        messageEl.style.color = "#10b981";
      }
      disableKeyboard();
    }
  }

  function renderKeyboard() {
    if (!keyboardContainer) return;
    keyboardContainer.innerHTML = "";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    alphabet.split("").forEach(letter => {
      const button = document.createElement("button");
      button.textContent = letter;
      button.classList.add("key-btn");
      button.type = "button";

      if (guessedLetters.includes(letter)) {
        button.disabled = true;
      }

      button.addEventListener("click", () => handleGuess(letter, button));
      keyboardContainer.appendChild(button);
    });
  }

  function handleGuess(letter, button) {
    button.disabled = true;
    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
      renderWord();
    } else {
      remainingLives--;
      if (livesEl) livesEl.textContent = remainingLives;

      if (remainingLives === 0) {
        if (messageEl) {
          messageEl.textContent = `❌ Game Over! A palavra era: ${selectedWord}`;
          messageEl.style.color = "#ef4444";
        }
        revealWord();
        disableKeyboard();
      }
    }
  }

  function revealWord() {
    if (!wordContainer) return;
    wordContainer.innerHTML = "";
    selectedWord.split("").forEach(letter => {
      const letterSpan = document.createElement("span");
      letterSpan.textContent = letter;
      wordContainer.appendChild(letterSpan);
    });
  }

  function disableKeyboard() {
    const buttons = keyboardContainer.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", initHangman);
  }

  initHangman();

});
