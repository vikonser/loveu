const CORRECT_NAME = "любимый";
const CORRECT_PASSWORD = "27102025";
const loginForm = document.getElementById("loginForm"),
  loginScreen = document.getElementById("loginScreen"),
  loveSite = document.getElementById("loveSite"),
  loginError = document.getElementById("loginError");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("username").value.trim(),
    password = document.getElementById("password").value;
  if (
    name.toLocaleLowerCase("ru") !== CORRECT_NAME.toLocaleLowerCase("ru") ||
    password !== CORRECT_PASSWORD
  ) {
    loginError.textContent = "♡ Имя или пароль неверны. Попробуй ещё раз.";
    document.getElementById("password").value = "";
    return;
  }
  loginError.textContent = "";
  loginScreen.style.opacity = "0";
  loginScreen.style.transform = "scale(1.03)";
  setTimeout(() => {
    loginScreen.style.display = "none";
    loveSite.style.display = "block";
    requestAnimationFrame(() => {
      loveSite.style.opacity = "1";
    });
    window.scrollTo(0, 0);
    initializeReveals();
    updateCounter();
  }, 650);
});
const relationshipStart = new Date(2025, 9, 27, 0, 0, 0);
function updateCounter() {
  const now = new Date();
  let diff = Math.max(0, now.getTime() - relationshipStart.getTime());
  const days = Math.floor(diff / 86400000),
    hours = Math.floor((diff % 86400000) / 3600000),
    minutes = Math.floor((diff % 3600000) / 60000),
    seconds = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0",
  );
  document.getElementById("dateMessage").textContent =
    now < relationshipStart
      ? "До начала нашего отсчёта ещё немного времени. ♡"
      : "27.10.2025 — и каждый новый миг становится частью нашей истории. ♥";
}
updateCounter();
setInterval(updateCounter, 1000);
const feelingCards = document.querySelectorAll(".feeling-card"),
  openedCount = document.getElementById("openedCount");
function updateOpenedCount() {
  const total = document.querySelectorAll(".feeling-card.is-flipped").length;
  openedCount.textContent =
    total === feelingCards.length
      ? "♥ Ты открыла все шесть секретов. Береги их!"
      : `Открыто карточек: ${total} из ${feelingCards.length}`;
}
feelingCards.forEach((card) =>
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
    card.setAttribute(
      "aria-pressed",
      String(card.classList.contains("is-flipped")),
    );
    updateOpenedCount();
  }),
);
const promiseItems = document.querySelectorAll(".promise-item"),
  promiseProgress = document.getElementById("promiseProgress"),
  promiseIcons = ["♡", "☾", "✧", "∞", "♥", "💌"];
function updatePromiseProgress() {
  const total = document.querySelectorAll(".promise-item.done").length;
  promiseProgress.textContent =
    total === promiseItems.length
      ? "♥ Все обещания отмечены. Пусть они станут частью вашей истории."
      : `Отмечено обещаний: ${total} из ${promiseItems.length}`;
}
promiseItems.forEach((item, index) => {
  item.setAttribute("aria-pressed", "false");
  item.addEventListener("click", () => {
    item.classList.toggle("done");
    const icon = item.querySelector(".promise-icon"),
      isDone = item.classList.contains("done");
    icon.textContent = isDone ? "✓" : promiseIcons[index];
    item.setAttribute("aria-pressed", String(isDone));
    updatePromiseProgress();
  });
});
const moodMessages = {
  happy: "Пусть сегодняшний день подарит тебе ещё тысячу причин улыбаться. ♡",
  sad: "Даже самое пасмурное небо однажды становится светлее. Ты не обязана быть сильной каждую секунду.",
  tired:
    "Сделай вдох. Отдохни. Тебе не нужно успевать всё сразу. Ты заслуживаешь заботы.",
  love: "Какое прекрасное чувство — иметь человека, о котором хочется думать даже в самых обычных моментах. ♥",
  miss: "Расстояние не отменяет нежности. Иногда скучать — это просто ещё один способ почувствовать, как дорог тебе человек.",
};
const moodButtons = document.querySelectorAll(".mood-btn"),
  moodResult = document.getElementById("moodResult");
moodButtons.forEach((button) =>
  button.addEventListener("click", () => {
    moodButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    moodResult.textContent = moodMessages[button.dataset.mood];
  }),
);

const memories = [
  "Ты заслуживаешь любви, в которой можно быть собой. ♡",
  "Самые красивые моменты часто начинаются с самых простых вещей.",
  "Пусть у тебя всегда будет причина улыбаться — даже в обычный вторник.",
  "Ты важнее, чем иногда сама себе напоминаешь.",
  "Не забывай замечать хорошее, которое уже есть в твоей жизни.",
  "Однажды обычный день станет тем самым воспоминанием, к которому захочется вернуться.",
  "Пусть рядом будут люди, с которыми спокойно твоему сердцу.",
  "Маленькие шаги тоже приближают к большим мечтам.",
  "Ты не обязана быть идеальной, чтобы быть особенной.",
  "Пусть в твоей истории будет как можно больше нежности и искренности. ♥",
];
let lastMemoryIndex = -1;
document.getElementById("memoryButton").addEventListener("click", () => {
  let index;
  do {
    index = Math.floor(Math.random() * memories.length);
  } while (memories.length > 1 && index === lastMemoryIndex);
  lastMemoryIndex = index;
  document.getElementById("memoryResult").textContent = memories[index];
});
document.getElementById("surpriseButton").addEventListener("click", () => {
  document.getElementById("surpriseMessage").textContent =
    "Если бы мне пришлось начинать эту историю заново, я бы всё равно захотел встретить тебя. ♡";
  for (let i = 0; i < 18; i++) setTimeout(createHeart, i * 100);
});
const heartsLayer = document.getElementById("heartsLayer");
let heartTimer = null;
function createHeart() {
  if (document.hidden || loveSite.style.display === "none") return;
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = ["♡", "♥", "✧", "ღ"][Math.floor(Math.random() * 4)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = 12 + Math.random() * 18 + "px";
  heart.style.animationDuration = 7 + Math.random() * 7 + "s";
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 15000);
}
function startHeartAnimation() {
  if (heartTimer) return;
  heartTimer = setInterval(createHeart, 1800);
}
startHeartAnimation();
document.addEventListener("visibilitychange", () => {
  if (document.hidden && heartTimer) {
    clearInterval(heartTimer);
    heartTimer = null;
  } else startHeartAnimation();
});
let revealObserver;
function initializeReveals() {
  if (!("IntersectionObserver" in window)) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("visible"));
    return;
  }
  if (!revealObserver)
    revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
  document
    .querySelectorAll(".reveal:not(.visible)")
    .forEach((el) => revealObserver.observe(el));
}
const menuToggle = document.getElementById("menuToggle"),
  navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }),
);
const backToTop = document.getElementById("backToTop");
window.addEventListener(
  "scroll",
  () => backToTop.classList.toggle("show", window.scrollY > 500),
  { passive: true },
);
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
const lightbox = document.getElementById("lightbox"),
  lightboxImage = document.getElementById("lightboxImage"),
  lightboxClose = document.getElementById("lightboxClose");
let previousFocus = null;
document.querySelectorAll(".photo-card").forEach((card) =>
  card.addEventListener("click", () => {
    const flipped = card.classList.toggle("is-flipped");
    card.setAttribute("aria-pressed", String(flipped));
  }),
);
function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImage.src = "";
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open"))
    closeLightbox();
});
const backgroundMusic = document.getElementById("backgroundMusic"),
  musicToggle = document.getElementById("musicToggle"),
  musicStatus = document.getElementById("musicStatus"),
  musicVolume = document.getElementById("musicVolume"),
  musicFile = document.getElementById("musicFile");
let musicContext = null,
  musicGain = null,
  musicTimer = null,
  musicNoteIndex = 0,
  customTrack = true;
backgroundMusic.src = "lovee.mp3";
backgroundMusic.volume = Number(musicVolume.value);
const melody = [
  523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25,
  783.99, 1046.5, 880, 783.99, 659.25, 587.33, 523.25, 392, 440, 523.25, 659.25,
  587.33, 523.25, 440,
];
function playSoftNote(freq, when, duration) {
  if (!musicContext || !musicGain) return;
  const osc = musicContext.createOscillator(),
    env = musicContext.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, when);
  env.gain.setValueAtTime(0.0001, when);
  env.gain.exponentialRampToValueAtTime(0.16, when + 0.04);
  env.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(env);
  env.connect(musicGain);
  osc.start(when);
  osc.stop(when + duration + 0.03);
}
function startBuiltInMusic() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    musicStatus.textContent =
      "Браузер не поддерживает встроенную музыку. Выбери аудиофайл ♡";
    return false;
  }
  if (!musicContext) {
    musicContext = new AudioCtx();
    musicGain = musicContext.createGain();
    musicGain.gain.value = Number(musicVolume.value);
    musicGain.connect(musicContext.destination);
  }
  musicContext.resume();
  if (musicTimer) clearInterval(musicTimer);
  musicNoteIndex = 0;
  const step = () => {
    if (!musicContext || musicContext.state !== "running") return;
    const now = musicContext.currentTime;
    playSoftNote(melody[musicNoteIndex % melody.length], now, 0.48);
    if (musicNoteIndex % 4 === 0)
      playSoftNote(melody[(musicNoteIndex + 4) % melody.length] / 2, now, 0.72);
    musicNoteIndex++;
  };
  step();
  musicTimer = setInterval(step, 430);
  return true;
}
function stopBuiltInMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  if (musicContext && musicContext.state === "running") musicContext.suspend();
}
function setMusicPlaying(playing) {
  musicToggle.textContent = playing ? "Ⅱ" : "▶";
  musicToggle.setAttribute(
    "aria-label",
    playing ? "Поставить музыку на паузу" : "Включить музыку",
  );
}
musicToggle.addEventListener("click", async () => {
  const customSource = customTrack && backgroundMusic.src;
  if (customSource) {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        setMusicPlaying(true);
        musicStatus.textContent = "Музыка играет ♡";
      } catch (error) {
        musicStatus.textContent = "Не удалось открыть файл. Выбери MP3 или M4A";
        setMusicPlaying(false);
      }
    } else {
      backgroundMusic.pause();
      setMusicPlaying(false);
      musicStatus.textContent = "Музыка на паузе";
    }
    return;
  }
  if (musicTimer) {
    stopBuiltInMusic();
    setMusicPlaying(false);
    musicStatus.textContent = "Музыка на паузе";
    return;
  }
  try {
    const ok = startBuiltInMusic();
    if (ok) {
      setMusicPlaying(true);
      musicStatus.textContent = "Играет нежная мелодия ♡";
    }
  } catch (error) {
    musicStatus.textContent =
      "Не удалось включить музыку. Попробуй другой браузер";
    setMusicPlaying(false);
  }
});
musicFile.addEventListener("change", () => {
  const file = musicFile.files && musicFile.files[0];
  if (!file) return;
  stopBuiltInMusic();
  if (musicContext && musicContext.state === "running") musicContext.suspend();
  backgroundMusic.pause();
  backgroundMusic.src = URL.createObjectURL(file);
  backgroundMusic.load();
  customTrack = true;
  setMusicPlaying(false);
  musicStatus.textContent = "Выбрано: " + file.name + " — нажми ▶";
});
backgroundMusic.addEventListener("error", () => {
  musicStatus.textContent =
    "Не удалось воспроизвести файл. Попробуй MP3 или M4A";
  setMusicPlaying(false);
});
backgroundMusic.addEventListener("ended", () => setMusicPlaying(false));
musicVolume.addEventListener("input", () => {
  const v = Number(musicVolume.value);
  backgroundMusic.volume = v;
  if (musicGain) musicGain.gain.value = v;
});
initializeReveals();
