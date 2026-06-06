// ====================================
// MAIN JavaScript - E-Modul Simple Present
// ====================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize all components
  initNavbar();
  initThemeToggle();
  initProgressTracking();
  initAnimations();
  
});

// ====================================
// NAVBAR FUNCTIONALITY
// ====================================
function initNavbar() {
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  
  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
      
      // Change icon
      if (navbarMenu.classList.contains('active')) {
        navbarToggle.textContent = '✕';
      } else {
        navbarToggle.textContent = '☰';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.navbar-container')) {
        navbarMenu.classList.remove('active');
        navbarToggle.textContent = '☰';
      }
    });
  }
  
  // Highlight active page
  highlightActivePage();
}

function highlightActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// ====================================
// THEME TOGGLE (Dark/Light Mode)
// ====================================
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!themeToggle) return;
  
  // Check saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
  
  // Toggle theme on click
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
  
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

// ====================================
// PROGRESS TRACKING
// ====================================
function initProgressTracking() {
  const progressInfo = document.getElementById('progressInfo');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  
  if (!progressInfo) return;
  
  // Get progress from localStorage
  const progress = getProgress();
  
  if (progress.totalProgress > 0) {
    progressInfo.style.display = 'block';
    progressBar.style.width = progress.totalProgress + '%';
    progressPercent.textContent = Math.round(progress.totalProgress) + '%';
  }
}

function getProgress() {
  const progress = {
    materialCompleted: localStorage.getItem('materialCompleted') === 'true',
    practiceScore: parseInt(localStorage.getItem('practiceScore')) || 0,
    quizScore: parseInt(localStorage.getItem('quizScore')) || 0,
    totalProgress: 0
  };
  
  // Calculate total progress (weighted)
  let completedSteps = 0;
  const totalSteps = 3;
  
  if (progress.materialCompleted) completedSteps += 1;
  if (progress.practiceScore > 0) completedSteps += 1;
  if (progress.quizScore > 0) completedSteps += 1;
  
  progress.totalProgress = (completedSteps / totalSteps) * 100;
  
  return progress;
}

function saveProgress(key, value) {
  localStorage.setItem(key, value);
  console.log('Progress saved:', key, value);
}

function checkProgress() {
  const progress = getProgress();
  
  let message = '📊 Progress Belajar Kamu:\n\n';
  message += progress.materialCompleted ? '✅ Materi: Selesai\n' : '⏳ Materi: Belum selesai\n';
  message += progress.practiceScore > 0 ? `✅ Latihan: ${progress.practiceScore}/100\n` : '⏳ Latihan: Belum dikerjakan\n';
  message += progress.quizScore > 0 ? `✅ Quiz: ${progress.quizScore}/100\n` : '⏳ Quiz: Belum dikerjakan\n';
  message += `\n📈 Total Progress: ${Math.round(progress.totalProgress)}%`;
  
  alert(message);
}

function resetProgress() {
  if (confirm('Apakah kamu yakin ingin mereset semua progress?')) {
    localStorage.removeItem('materialCompleted');
    localStorage.removeItem('practiceScore');
    localStorage.removeItem('quizScore');
    localStorage.removeItem('practiceAnswers');
    localStorage.removeItem('quizAnswers');
    
    alert('✅ Progress berhasil direset!');
    location.reload();
  }
}

// ====================================
// SMOOTH SCROLL
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
  }
  
  lastScroll = currentScroll;
});

// ====================================
// UTILITY FUNCTIONS
// ====================================

// Shuffle array (for randomizing questions)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Format time (for timer)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Show notification/alert
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} fade-in`;
  alertDiv.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; cursor: pointer; font-size: 1.2rem;">&times;</button>
  `;
  alertDiv.style.display = 'flex';
  alertDiv.style.justifyContent = 'space-between';
  alertDiv.style.alignItems = 'center';
  
  // Insert at top of body or main content
  const container = document.querySelector('.container') || document.body;
  container.insertBefore(alertDiv, container.firstChild);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    alertDiv.style.opacity = '0';
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getProgress,
    saveProgress,
    checkProgress,
    resetProgress,
    shuffleArray,
    formatTime,
    showAlert
  };
}
