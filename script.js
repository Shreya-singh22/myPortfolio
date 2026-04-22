// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Typewriter effect for Hero Subtitle
const subtitleText = "Computer Science Engineering Student | AI Enthusiast | Full-Stack Developer";
const typewriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < subtitleText.length) {
        typewriterElement.innerHTML += subtitleText.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // Typing speed
    }
}

// Start typewriter when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add small delay before typing starts
    setTimeout(typeWriter, 500);
});
