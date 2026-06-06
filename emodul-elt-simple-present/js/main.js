// =====================================================
// MAIN JAVASCRIPT - Core Functionality
// E-Module Simple Present Tense
// =====================================================

// ===== THEME MANAGEMENT =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// Event listener for theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Load theme on page load
loadTheme();

// ===== MOBILE NAVIGATION =====
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        
        // Animate toggle button
        if (navbarMenu.classList.contains('active')) {
            navbarToggle.textContent = '✕';
        } else {
            navbarToggle.textContent = '☰';
        }
    });
    
    // Close menu when clicking a link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            navbarToggle.textContent = '☰';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
            navbarMenu.classList.remove('active');
            navbarToggle.textContent = '☰';
        }
    });
}

// ===== PROGRESS TRACKING =====
function getProgress() {
    const progress = {
        materialCompleted: localStorage.getItem('materialCompleted') === 'true' || false,
        practiceScore: parseInt(localStorage.getItem('practiceScore')) || 0,
        quizScore: parseInt(localStorage.getItem('quizScore')) || 0,
        quizCompleted: localStorage.getItem('quizCompleted') === 'true' || false,
    };
    
    // Calculate overall progress percentage
    let progressPercent = 0;
    if (progress.materialCompleted) progressPercent += 30;
    if (progress.practiceScore > 0) progressPercent += 30;
    if (progress.quizCompleted) progressPercent += 40;
    
    progress.percentage = Math.min(progressPercent, 100);
    
    return progress;
}

function updateProgressDisplay() {
    const progressInfo = document.getElementById('progressInfo');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    
    if (progressInfo && progressBar && progressPercent) {
        const progress = getProgress();
        
        if (progress.percentage > 0) {
            progressInfo.style.display = 'block';
            progressBar.style.width = progress.percentage + '%';
            progressPercent.textContent = progress.percentage + '%';
        }
    }
}

// Call on homepage
if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    updateProgressDisplay();
}

// ===== CHECK PROGRESS FUNCTION (for homepage button) =====
function checkProgress() {
    const progress = getProgress();
    
    let message = '📊 Progress Belajar Kamu:\n\n';
    message += `📖 Materi: ${progress.materialCompleted ? '✅ Selesai' : '⏳ Belum selesai'}\n`;
    message += `✏️ Latihan: ${progress.practiceScore > 0 ? `✅ Score: ${progress.practiceScore}` : '⏳ Belum selesai'}\n`;
    message += `🎯 Quiz: ${progress.quizCompleted ? `✅ Score: ${progress.quizScore}` : '⏳ Belum selesai'}\n\n`;
    message += `Total Progress: ${progress.percentage}%`;
    
    alert(message);
}

// ===== SCROLL ANIMATIONS (Intersection Observer) =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and fade-in elements
    const animatedElements = document.querySelectorAll('.card, .fade-in');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupScrollAnimations);
} else {
    setupScrollAnimations();
}

// ===== ACTIVE PAGE HIGHLIGHTING =====
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    
    menuLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

highlightActivePage();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== UTILITY: Display Toast Notification =====
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--gradient-success)' : 
                     type === 'error' ? 'var(--gradient-error)' : 
                     'var(--gradient-primary)'};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideInUp 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== CELEBRATE ACHIEVEMENT =====
function celebrateAchievement(badge) {
    showToast(`🎉 Achievement Unlocked: ${badge}!`, 'success');
    
    // Simple confetti effect (using emojis)
    for (let i = 0; i < 20; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    const emojis = ['🎉', '⭐', '✨', '🌟', '💫', '🏆'];
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.cssText = `
        position: fixed;
        top: -50px;
        left: ${Math.random() * 100}%;
        font-size: 2rem;
        z-index: 9999;
        pointer-events: none;
        animation: fall ${2 + Math.random() * 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 4000);
}

// Add fall animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c📚 E-Modul Simple Present Tense', 'color: #4F46E5; font-size: 24px; font-weight: bold;');
console.log('%cSelamat belajar! 🚀', 'color: #7C3AED; font-size: 16px;');
console.log('%cDibuat dengan ❤️ untuk siswa SMP Indonesia', 'color: #666; font-size: 12px;');
