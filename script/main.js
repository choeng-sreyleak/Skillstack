const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

mobileMenuToggle.addEventListener("click", function () {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// Close menu when a mobile link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});
// ==================================================
// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Toggle dark mode
function toggleDarkMode() {
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Event listeners
darkModeToggle.addEventListener("click", toggleDarkMode);

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  });

// Initialize theme on page load
initializeTheme();
//   ===================================================================================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navbar
//   window.addEventListener("scroll", function () {
//     const nav = document.querySelector("nav");
//     if (window.scrollY > 50) {
//       nav.classList.add("shadow-lg");
//     } else {
//       nav.classList.remove("shadow-lg");
//     }
//   });

// Testimonial carousel functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".pagination-dot");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("bg-gray-300");
      dot.classList.add("bg-blue-600");
    } else {
      dot.classList.remove("bg-blue-600");
      dot.classList.add("bg-gray-300");
    }
  });
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Add click handlers for pagination dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".group, .bg-white").forEach((el) => {
  observer.observe(el);
});

// Add CSS animation classes
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            .group:hover .group-hover\\:scale-105 {
                transform: scale(1.05);
            }
            
            .transition-all {
                transition: all 0.3s ease;
            }
        `;
document.head.appendChild(style);

// Form validation and submission
function handleFormSubmission(event) {
  event.preventDefault();

  // Simple form validation
  const email = event.target.querySelector('input[type="email"]');
  if (email && !email.value.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate form submission
  alert("Thank you for your interest! We'll get back to you soon.");
}

// Add event listeners to forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", handleFormSubmission);
});
// ========================= animetion hero section========================================
// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect for heading
  const lines = ["line1", "line2", "line3", "line4"];
  let currentLine = 0;

  function showNextLine() {
    if (currentLine < lines.length) {
      const element = document.getElementById(lines[currentLine]);
      element.style.display = "block";

      // Remove cursor from previous line
      if (currentLine > 0) {
        const prevElement = document.getElementById(lines[currentLine - 1]);
        prevElement.classList.add("no-cursor");
      }

      currentLine++;

      // Schedule next line
      if (currentLine < lines.length) {
        setTimeout(showNextLine, 1800); // Wait for typewriter + small delay
      } else {
        // Remove cursor from last line
        element.classList.add("no-cursor");
        // Start other animations after typewriter is complete
        startOtherAnimations();
      }
    }
  }

  function startOtherAnimations() {
    // Animate subtitle and buttons
    const subtitle = document.querySelector(".subtitle");
    const buttons = document.querySelector(".buttons");

    setTimeout(() => {
      subtitle.classList.add("animate-fade-in-up");
    }, 200);

    setTimeout(() => {
      buttons.classList.add("animate-fade-in-up");
    }, 400);
  }

  // Start typewriter effect
  setTimeout(showNextLine, 500);

  // Animate image
  const imageContainer = document.querySelector(".image-container");
  setTimeout(() => {
    imageContainer.classList.add("animate-fade-in-right");
  }, 1000);

  // Add floating particles animation
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    particle.style.animation = `float ${3 + index}s ease-in-out infinite`;
    particle.style.animationDelay = `${index * 0.5}s`;
  });
});

// Add mouse movement parallax effect
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.5;
    particle.style.transform = `translate(${mouseX * speed}px, ${
      mouseY * speed
    }px)`;
  });
});
