// ✨ EMOJI MAGIC ✨

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    updateThemeEmoji();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeEmoji();
    createConfetti();
});

function updateThemeEmoji() {
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = `<span class="toggle-emoji">${isDark ? '☀️' : '🌙'}</span>`;
}

// Floating emoji particles
const emojiSet = ['✨', '🎨', '🚀', '💡', '🎯', '💖', '🌟', '⚡', '🎭', '💫'];

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '-50px';
    particle.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    document.querySelector('.emoji-particles').appendChild(particle);

    const duration = Math.random() * 3000 + 3000;
    const xDrift = (Math.random() - 0.5) * 200;

    particle.animate([
        { transform: 'translateY(0) translateX(0)', opacity: parseFloat(particle.style.opacity) },
        { transform: `translateY(${window.innerHeight + 100}px) translateX(${xDrift}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 1000);

// Confetti explosion on click
function createConfetti() {
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'particle';
        confetti.textContent = ['🎉', '🎊', '✨', '🎈', '💖'][Math.floor(Math.random() * 5)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = Math.random() * 50 + '%';
        confetti.style.fontSize = Math.random() * 2 + 1 + 'rem';

        document.querySelector('.emoji-particles').appendChild(confetti);

        confetti.animate([
            {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 400}px, ${Math.random() * 300 + 100}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Click anywhere to create joy
document.addEventListener('click', (e) => {
    // Don't trigger on buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    // Random chance of joy
    if (Math.random() > 0.8) {
        createJoyAtPoint(e.clientX, e.clientY);
    }
});

function createJoyAtPoint(x, y) {
    const joy = document.createElement('div');
    joy.className = 'particle';
    joy.textContent = '💖';
    joy.style.left = x + 'px';
    joy.style.top = y + 'px';
    joy.style.fontSize = '2rem';
    joy.style.position = 'fixed';
    joy.style.pointerEvents = 'none';

    document.querySelector('.emoji-particles').appendChild(joy);

    joy.animate([
        {
            transform: 'translate(0, 0) scale(1)',
            opacity: 1
        },
        {
            transform: 'translate(0, -100px) scale(0)',
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    }).onfinish = () => joy.remove();
}

// Staggered fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((el, index) => {
    el.style.animationDelay = (index * 0.15) + 's';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') {
        themeToggle.click();
    }
    if (e.key === 'j' || e.key === 'J') {
        createConfetti();
    }
});

// Log easter egg
console.log('%c✨ Welcome to the EMOOOO version! ✨', 'font-size: 20px; color: #FF006E; font-weight: bold;');
console.log('%c🎨 Click anywhere for joy! Press D for dark mode, J for confetti! 🎨', 'font-size: 14px; color: #00D9FF;');
console.log('%c💖 Made with love and emojis 💖', 'font-size: 12px; color: #FFB703;');

// Page load animation
window.addEventListener('load', () => {
    createConfetti();
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            createJoyAtPoint(window.innerWidth / 2, window.innerHeight / 2);
        }
    });
});

// Emoji rain on Easter eggs
let easterEggCount = 0;
document.addEventListener('click', () => {
    easterEggCount++;
    if (easterEggCount === 10) {
        emojiRain();
        easterEggCount = 0;
    }
});

function emojiRain() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const rain = document.createElement('div');
            rain.className = 'particle';
            rain.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
            rain.style.left = Math.random() * 100 + '%';
            rain.style.top = '-50px';
            rain.style.fontSize = Math.random() * 2 + 1.5 + 'rem';
            rain.style.position = 'fixed';

            document.querySelector('.emoji-particles').appendChild(rain);

            rain.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 2000,
                easing: 'ease-in'
            }).onfinish = () => rain.remove();
        }, i * 30);
    }
}
