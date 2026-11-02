
// =================================
// 1. MOBILE NAVIGATION MENU
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close menu after clicking a navigation link

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";

    });

});


// =================================
// 2. TYPING ANIMATION
// =================================

const typingText = document.getElementById("typing-text");

const words = [
    "Network Computing Student",
    "Aspiring Cybersecurity Professional",
    "Technology Enthusiast"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeAnimation() {

    const currentWord = words[wordIndex];

    if (deleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }

    typingText.textContent =
        currentWord.substring(0, characterIndex);

    let speed = deleting ? 50 : 100;

    if (!deleting && characterIndex === currentWord.length) {

        deleting = true;
        speed = 1500;

    } else if (deleting && characterIndex === 0) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {
            wordIndex = 0;
        }

        speed = 500;

    }

    setTimeout(typeAnimation, speed);

}

typeAnimation();

// =================================
// 3. DARK MODE
// =================================

const themeToggle = document.getElementById("themeToggle");

function updateTheme(isDark) {

    document.body.classList.toggle("dark-mode", isDark);

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    localStorage.setItem("portfolioTheme", isDark ? "dark" : "light");

}

themeToggle.addEventListener("click", function () {

    const isDark = document.body.classList.contains("dark-mode");

    updateTheme(!isDark);

});

// Restore saved theme
updateTheme(localStorage.getItem("portfolioTheme") === "dark");


// =================================
// 4. PROJECT FILTERING
// =================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedCategory = button.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter project cards
        projectCards.forEach(function (card) {

            const cardCategory = card.getAttribute("data-category");

            if (selectedCategory === "all" || selectedCategory === cardCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});

// =================================
// 5. SCROLL REVEAL ANIMATION
// =================================

// Automatically add reveal effect to sections and cards

document.querySelectorAll(
    "section, .project-card, .experience-card"
).forEach(function (element) {

    element.classList.add("reveal");

});

// Observe elements when they enter the screen

const revealObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(".reveal").forEach(function (element) {

    revealObserver.observe(element);

});


// =================================
// 6. BACK TO TOP BUTTON
// =================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =================================
// 7. ACTIVE NAVIGATION
// =================================

const pageSections = document.querySelectorAll("section");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navigationLinks.forEach(function (link) {

                    link.classList.remove("active-link");

                    if (link.getAttribute("href") === "#" + currentId) {

                        link.classList.add("active-link");

                    }

                });

            }

        });

    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

pageSections.forEach(function (section) {

    sectionObserver.observe(section);

});
