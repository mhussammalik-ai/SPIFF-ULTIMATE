const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const chatbotClose = document.getElementById('chatbot-close');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatbotBody = document.getElementById('chatbot-body');
const quickLinks = document.querySelectorAll('#quick-links button');

chatbotToggle.addEventListener('click', () => { chatbot.style.display='flex'; chatbotToggle.style.display='none'; });
chatbotClose.addEventListener('click', () => { chatbot.style.display='none'; chatbotToggle.style.display='block'; });

function addMessage(msg, sender='bot'){
  const div=document.createElement('div'); div.classList.add('chat-message', sender); div.textContent=msg;
  chatbotBody.appendChild(div); chatbotBody.scrollTop=chatbotBody.scrollHeight;
}

function botReply(message){
  const msg=message.toLowerCase();
  let reply = "🤖 I don't understand. Use quick links or ask about the site!";
  if(msg.includes("nexus")) reply="🚀 Nexus: Latest game updates and resources.";
  else if(msg.includes("vault")) reply="🔒 Vault: Achievements, collections, special content.";
  else if(msg.includes("arena")) reply="🏆 Arena: Competitive battles and events.";
  else if(msg.includes("questline")) reply="📜 Questline: Main story missions and progression.";
  else if(msg.includes("echoes")) reply="🎵 Echoes: Blogs, stories, updates.";
  else if(msg.includes("pulse")) reply="💓 Pulse: Industry insights and trends.";
  else if(msg.includes("signa")) reply="✨ Signa: Developer profiles and contributions.";
  else if(msg.includes("website") || msg.includes("full detail")) reply="🌐 PAKGAMES: Premier Pakistani gaming platform with Nexus, Vault, Arena, Questline, Echoes, Pulse, Signa. Includes industry overview, developers, careers, esports, trends, and contact info. Fully mobile-friendly and interactive!";
  else if(msg.includes("developers") || msg.includes("studios") || msg.includes("careers")) reply="👨‍💻 Developers: Mindstorm, Caramel Tech, Indie devs. Careers: developer, designer, esports player.";
  else if(msg.includes("industry") || msg.includes("trends")) reply="📈 Pakistan's gaming industry is growing fast with AR/VR, AI, cloud gaming, esports.";
  else if(msg.includes("esports")) reply="🎮 Esports: Local tournaments, pro players, streaming growth.";
  addMessage(reply,'bot');
}

sendBtn.addEventListener('click',()=>{
  const msg=userInput.value.trim();
  if(msg){ addMessage(msg,'user'); setTimeout(()=>botReply(msg),600); userInput.value=''; }
});
userInput.addEventListener('keypress',e=>{ if(e.key==='Enter') sendBtn.click(); });

quickLinks.forEach(btn=>{
  btn.addEventListener('click',()=>{
    addMessage(`Taking me to ${btn.dataset.section}`,'user');
    setTimeout(()=>botReply(btn.dataset.section),500);
  });
});






// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    changeSlide(next);
}

// Auto-advance slider every 5 seconds
setInterval(nextSlide, 5000);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced Modal System
function openModal() {
    document.getElementById('authModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('authModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchToSignup() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'grid';
}

function switchToLogin() {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'grid';
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login with animation
    const button = event.target.querySelector('.btn-auth');
    button.innerHTML = '<span>Logging in...</span>';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`Welcome back, ${username}!`);
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true');
        updateLoginButton();
        closeModal();
        
        // Reset form and button
        event.target.reset();
        button.innerHTML = '<span>Login</span><div class="btn-glow"></div>';
        button.disabled = false;
    }, 1500);
    
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    
    // Simulate signup with animation
    const button = event.target.querySelector('.btn-auth');
    button.innerHTML = '<span>Creating Account...</span>';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`Account created successfully, ${name}! Please login.`);
        switchToLogin();
        
        // Reset form and button
        event.target.reset();
        button.innerHTML = '<span>Sign Up</span><div class="btn-glow"></div>';
        button.disabled = false;
    }, 1500);
    
    return false;
}

function updateLoginButton() {
    const loginBtn = document.querySelector('.btn-login');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const username = localStorage.getItem('username');
    
    if (isLoggedIn === 'true') {
        loginBtn.textContent = username || 'Profile';
        loginBtn.onclick = function() {
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                loginBtn.textContent = 'Login';
                loginBtn.onclick = openModal;
                alert('Logged out successfully!');
            }
        };
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const button = event.target.querySelector('.btn-primary');
    const originalText = button.innerHTML;
    button.innerHTML = 'Sending...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        event.target.reset();
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1500);
    
    return false;
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    const modalBackdrop = event.target.classList.contains('modal-backdrop');
    
    if (modalBackdrop) {
        closeModal();
    }
}

// Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    const nav = document.querySelector('nav');
    
    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
    
    // Add shadow to nav on scroll
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Parallax Effect for Hero Images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.slide img');
    
    parallaxElements.forEach(el => {
        const rate = scrolled * 0.5;
        el.style.transform = `translateY(${rate}px)`;
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
        this.style.animation = 'fadeIn 0.5s ease-in';
    });
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('authModal');
    
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Initialize on page load
window.addEventListener('load', () => {
    updateLoginButton();
    
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.trend-card, .profile-card, .game-card, .player-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Initialize tooltips or other features here if needed
    console.log('Pakistan Gaming Hub loaded successfully! 🎮');
});

// Add smooth hover effect to game cards
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
    });
});

// Add click effect to gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // You can add lightbox functionality here
        const emoji = this.textContent;
        console.log('Gallery item clicked:', emoji);
        
        // Add pulse animation
        this.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Newsletter form handler
const newsletterForm = document.querySelector('footer form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        alert(`Thanks for subscribing with ${email}! Stay tuned for gaming updates.`);
        e.target.reset();
    });
}

// Add typing animation to hero text (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Preload images for smoother transitions
function preloadImages() {
    const images = [
        './cartoon-students-math-class.jpg',
        './confused-hacker-pointing-screen.jpg',
        './futuristic-business-office-space.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Add particle effect on mouse move (optional - performance intensive)
let particles = [];

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'var(--primary)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.6';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add console easter egg
console.log('%c🎮 Pakistan Gaming Hub 🎮', 'font-size: 24px; color: #00ff88; font-weight: bold; text-shadow: 0 0 10px #00ff88;');
console.log('%cWelcome, Developer! 👨‍💻', 'font-size: 16px; color: #00d4ff;');
console.log('%cExplore, Create, Power! 🚀', 'font-size: 14px; color: #ff0080;');