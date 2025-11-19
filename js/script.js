// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation when scrolling
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-content');
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(51, 51, 51, 0.95)';
    } else {
        navbar.style.backgroundColor = '#333';
    }
});

// Simple typing effect for name (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add hover effect to profile image
const profileImages = document.querySelectorAll('#profile-img, #about-img');
profileImages.forEach(img => {
    // Handle image loading errors
    img.addEventListener('error', function() {
        // If image fails to load, show a placeholder
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: ${this.width || 200}px;
            height: ${this.height || 200}px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
            border: 5px solid white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        placeholder.textContent = '👤';
        placeholder.className = 'image-placeholder';
        this.parentNode.insertBefore(placeholder, this);
    });
    
    img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s';
    });
    
    img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Simple counter animation for skills (if you want to add numbers later)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

console.log('Portfolio website loaded successfully!');

