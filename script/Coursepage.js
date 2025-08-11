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


// API APPYY CARD 
const container = document.getElementById("Container_card");
const pageInfo = document.getElementById("page-info");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let allCourses = [];
let currentPage = 1;
const cardsPerPage = 8;
let totalPages = 1;

async function fetchCourses() {
  try {
    const url = "https://course-api.istad.co/api/v1/courses?page=0&size=40";
    const res = await fetch(url);
    const data = await res.json();
    allCourses = data.content;
    totalPages = Math.ceil(allCourses.length / cardsPerPage);
    renderCards();
  } catch (error) {
    console.error("Failed to load courses:", error);
  }
}

function renderCards() {
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const visibleCourses = allCourses.slice(start, end);

  container.innerHTML = visibleCourses.map(pro => `
      <div class="w-full bg-white rounded-[12px] shadow-md p-4 flex flex-col space-y-4 dark:bg-gray-700 dark:text-white transition-colors duration-300 ">
        <div class="flex justify-center mb-4">
          <img src="${pro.thumbnail}" alt ${pro.title} class="rounded-xl w-full max-w-xs object-contain" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">${pro.title}</h2>
        <p class="text-gray-600 text-md mb-4 line-clamp-2">${pro.description}</p>
        <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div class="flex items-center space-x-1">
           <span class="bg-yellow-600 text-yellow-100 rounded-xl px-2 py-1 text-sm font-semibold shadow-[0_0_8px_rgba(255,223,93,0.7)]">
  ${pro.categoryName}
</span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold"> <img src="../imgs/ISTAD.png" alt=""> </div>
            <span class="text-gray-700 font-medium ">ISTAD</span>
             <div class="flex items-center text-gray-500">
             <span class="text-gray-700 text-2xl p-1 font-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${pro.discount}</span>
           <span class="text-gray-500 text-md line-through"> $${pro.price}</span>
           </div>
        </div>
      </div>
    </div>
    `).join("");

  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
  updateButtons();
}
function updateButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    renderCards();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderCards();
  }
}
fetchCourses();

