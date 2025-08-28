import { SpeedInsights } from "@vercel/speed-insights/next"

// Initialize Speed Insights (optional)
const speedInsights = new SpeedInsights

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Parallax Effect
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector(".parallax-bg");

    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Navbar background opacity
    const navbar = document.querySelector(".navbar");
    const scrollPercent = scrolled / window.innerHeight;
    const opacity = Math.min(scrollPercent * 2, 1);
    navbar.style.background = `rgba(0, 0, 0, ${0.7 + opacity * 0.3})`;

    // Show/Hide foto-rosto based on hero-image visibility
    const heroImage = document.querySelector(".hero-image");
    const fotoRosto = document.getElementById("foto-rosto");

    if (heroImage && fotoRosto) {
      const heroImageRect = heroImage.getBoundingClientRect();
      const isHeroImageVisible = heroImageRect.bottom > 0;

      if (!isHeroImageVisible) {
        fotoRosto.classList.add("visible");
      } else {
        fotoRosto.classList.remove("visible");
      }
    }
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all sections for fade-in effect
  const sections = document.querySelectorAll(
    ".about, .category-section, .footer"
  );
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // Media Items Hover Effect
  const mediaItems = document.querySelectorAll(".media-item");
  mediaItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Active Navigation Link Highlight
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });

  // Loading Animation for Hero Text
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".hero-description");
  const ctaButton = document.querySelector(".cta-button");

  setTimeout(() => {
    if (heroTitle) heroTitle.style.opacity = "1";
  }, 100);
  setTimeout(() => {
    if (heroSubtitle) heroSubtitle.style.opacity = "1";
  }, 300);
  setTimeout(() => {
    if (heroDescription) heroDescription.style.opacity = "1";
  }, 500);
  setTimeout(() => {
    if (ctaButton) ctaButton.style.opacity = "1";
  }, 700);

  // Typing Effect for Hero Title (Optional)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Media Item Click Handlers (for future video integration)
  mediaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const placeholder = this.querySelector(".media-placeholder");
      if (placeholder) {
        // Here you can add video modal or redirect logic
        console.log("Media item clicked:", this);

        // Example: Add pulse animation
        this.style.animation = "pulse 0.3s ease-in-out";
        setTimeout(() => {
          this.style.animation = "";
        }, 300);
      }
    });
  });

  // Social Media Analytics (Optional)
  const socialButtons = document.querySelectorAll(".social-btn");
  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const platform = this.classList.contains("whatsapp")
        ? "WhatsApp"
        : this.classList.contains("instagram")
        ? "Instagram"
        : "Email";
      console.log(`Social media click: ${platform}`);
    });
  });

  // Scroll to Top on Logo Click
  const logo = document.querySelector(".nav-logo");
  if (logo) {
    logo.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    logo.style.cursor = "pointer";
  }

  // Add CSS for pulse animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .nav-link.active {
            color: #8B5CF6 !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
  document.head.appendChild(style);

  // Preload animations
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Window Load Event
window.addEventListener("load", function () {
  // Hide loading screen if you have one
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
});

// Resize Event Handler
window.addEventListener("resize", function () {
  // Recalculate parallax on resize
  const parallaxBg = document.querySelector(".parallax-bg");
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
  }
});

// Utility Functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

// Optimized scroll handler
const optimizedScroll = debounce(function () {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector(".parallax-bg");

  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
}, 10);

window.addEventListener("scroll", optimizedScroll);

// Add to Home Screen Prompt (PWA Ready)
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show install button if needed
  const installBtn = document.querySelector(".install-btn");
  if (installBtn) {
    installBtn.style.display = "block";

    installBtn.addEventListener("click", () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  }
});
