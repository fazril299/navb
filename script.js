// ⭐ Membuat ratusan bintang otomatis
const bg = document.body; 
const starCount = 200;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let delay = Math.random() * 4;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.animationDelay = `${delay}s`;

    bg.appendChild(star);
}

// 🚀 Animasi muncul
window.addEventListener("load", () => {
    document.querySelector(".home-content").classList.add("show");
    document.querySelector(".home-img img").classList.add("show");
});

// 🔥 Fitur buka sertifikat
function openCert(src) {
    document.getElementById("popupImg").src = src;
    document.getElementById("certPopup").style.display = "flex";
}

// ❌ Tutup viewer
function closeCert() {
    document.getElementById("certPopup").style.display = "none";
}

// Open Certificate Popup
document.querySelectorAll(".cert-item img").forEach((img) => {
    img.addEventListener("click", () => {
        document.getElementById("certPopup").style.display = "flex";
        document.getElementById("popupImg").src = img.src;
    });
});

// Close Popup
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("certPopup").style.display = "none";
});

document.querySelectorAll(".cert-item").forEach(card => {``
    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let rotateY = (x / rect.width - 0.5) * 25;
        let rotateX = (0.5 - y / rect.height) * 25;

        card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
});

/* ===== 3D Parallax & Tilt Script (paste / replace at the end of script.js) ===== */

(function() {
  // Safety checks and feature detection
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = window.innerWidth < 996; // breakpoint sama seperti CSS
  if (prefersReduced || isSmall) {
    // Jangan jalankan efek berat
    console.log('3D effects reduced/disabled (reduced-motion or small screen).');
    // still run simple entrance animation observer below
    initScrollReveal();
    return;
  }

  // Elements
  const hero = document.querySelector('.home');
  const heroImg = document.querySelector('.home-img img');
  const heroContent = document.querySelector('.home-content');
  const socialIcons = document.querySelectorAll('.social-icons a');
  const certItems = document.querySelectorAll('.cert-item');

  // RequestAnimationFrame loop variables
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let rafId;

  // Throttle update using rAF
  function updateLoop() {
    // easing
    targetX += (mouseX - targetX) * 0.12;
    targetY += (mouseY - targetY) * 0.12;

    const rotY = targetX * 0.08; // rotation multiplier
    const rotX = -targetY * 0.08;
    const translateX = targetX * 6;
    const translateY = targetY * 6;

    if (heroImg) {
      // Move image as mid-layer
      heroImg.style.transform = `translateZ(80px) rotateY(${rotY}deg) rotateX(${rotX}deg) translate(${translateX}px, ${translateY}px)`;
    }

    if (heroContent) {
      // move text/content a bit more front
      heroContent.style.transform = `translateZ(120px) translateX(${translateX/2}px) translateY(${translateY/2}px)`;
    }

    // small parallax for social icons
    socialIcons.forEach((el, i) => {
      const depth = 12 + i * 2;
      el.style.transform = `translateZ(${depth}px) translate(${translateX/(10+i)}px, ${translateY/(10+i)}px)`;
    });

    rafId = requestAnimation

        rafId = requestAnimationFrame(updateLoop);
  }

  function onMouseMove(e) {
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    mouseX = (e.clientX - halfW) / halfW * 100;
    mouseY = (e.clientY - halfH) / halfH * 100;
  }

  // Mulai efek
  function start3D() {
    if (!rafId) rafId = requestAnimationFrame(updateLoop);
  }

  function stop3D() {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener('mousemove', onMouseMove);

  // Freeze when user switches tab
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop3D();
    else start3D();
  });

  // Scroll reveal
  function initScrollReveal() {
    const revealElems = document.querySelectorAll('.cert-item, .section-title');
    const options = { threshold: 0.15 };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-up');
        }
      });
    }, options);

    revealElems.forEach(e => obs.observe(e));
  }

  initScrollReveal();
  start3D();
})();
