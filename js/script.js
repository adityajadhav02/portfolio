// Mobile Menu Toggle Logic
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
        body.classList.add('overflow-hidden'); 
    } else {
        menu.classList.add('translate-x-full');
        body.classList.remove('overflow-hidden');
    }
}

// Intersection Observer for "Reveal on Scroll" Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const menu = document.getElementById('mobile-menu');
            if (!menu.classList.contains('translate-x-full')) {
                toggleMobileMenu();
            }

            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});