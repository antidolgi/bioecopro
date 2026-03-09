// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНФИГУРАЦИЯ =====
const CONFIG = {
    SITE_NAME: 'БИОЭКОПРО',
    SITE_URL: 'bio-ecopro.ru',
    PHONE: '+7 (995) 788-66-68',
    EMAIL: 'info@bio-ecopro.ru',
    THEME_KEY: 'bioecopro_theme',
    FORM_DATA_KEY: 'bioecopro_form_data'
};

// Состояние приложения
const STATE = {
    theme: 'light',
    cart: [],
    currentModel: null,
    formData: {}
};

// DOM элементы
const DOM = {
    themeToggle: null,
    navbar: null,
    menuToggle: null,
    navLinks: null,
    mobileMenuOverlay: null,
    particlesCanvas: null,
    scrollTop: null,
    pageProgress: null,
    successModal: null,
    privacyModal: null,
    contractModal: null,
    requisitesModal: null,
    orderForm: null,
    charCount: null,
    faqQuestions: null,
    captchaQuestion: null,
    captchaAnswer: null,
    captchaResult: null
};

// Данные для капчи
let captchaNum1, captchaNum2;

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    console.log(`%c🚀 ${CONFIG.SITE_NAME} v1.0`, 'font-size: 20px; color: #00C9B1; font-weight: bold;');
    
    initializeDOM();
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initializeForm();
    initializeFAQ();
    initializeScroll();
    initializeModals();
    generateCaptcha();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
        startCountAnimations();
    }, 100);
});

// ===== ИНИЦИАЛИЗАЦИЯ DOM =====
function initializeDOM() {
    DOM.themeToggle = document.querySelector('.theme-toggle');
    DOM.navbar = document.querySelector('.navbar');
    DOM.menuToggle = document.getElementById('menuToggle');
    DOM.navLinks = document.querySelector('.nav-links');
    DOM.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    DOM.particlesCanvas = document.getElementById('particles-canvas');
    DOM.scrollTop = document.getElementById('scrollTop');
    DOM.pageProgress = document.getElementById('progressBar');
    DOM.successModal = document.getElementById('successModal');
    DOM.privacyModal = document.getElementById('privacyModal');
    DOM.contractModal = document.getElementById('contractModal');
    DOM.requisitesModal = document.getElementById('requisitesModal');
    DOM.orderForm = document.getElementById('orderForm');
    DOM.faqQuestions = document.querySelectorAll('.faq-question');
    DOM.captchaQuestion = document.getElementById('captchaQuestion');
    DOM.captchaAnswer = document.getElementById('captchaAnswer');
    DOM.captchaResult = document.getElementById('captchaResult');
    DOM.charCount = document.getElementById('charCount');
}

// ===== ТЕМА =====
function initializeTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    STATE.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', STATE.theme);
    if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', STATE.theme);
    localStorage.setItem(CONFIG.THEME_KEY, STATE.theme);
    if (DOM.particlesCanvas) {
        initializeParticles();
    }
    DOM.themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        DOM.themeToggle.style.transform = 'rotate(0)';
    }, 300);
}

// ===== НАВИГАЦИЯ =====
function initializeNavigation() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
        updateScrollTop();
        updatePageProgress();
    });
    
    if (DOM.menuToggle && DOM.navLinks) {
        DOM.menuToggle.addEventListener('click', toggleMobileMenu);
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    closeMobileMenu();
                }
            });
        });
    }
    
    if (DOM.mobileMenuOverlay) {
        DOM.mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = DOM.navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                if (window.innerWidth <= 992) closeMobileMenu();
            }
        });
    });
}

function toggleMobileMenu() {
    const isExpanded = DOM.menuToggle.getAttribute('aria-expanded') === 'true';
    DOM.menuToggle.setAttribute('aria-expanded', !isExpanded);
    DOM.navLinks.classList.toggle('open');
    DOM.mobileMenuOverlay.classList.toggle('open');
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
}

function closeMobileMenu() {
    DOM.menuToggle.setAttribute('aria-expanded', 'false');
    DOM.navLinks.classList.remove('open');
    DOM.mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== ЧАСТИЦЫ (полная функция из твоего исходного кода) =====
function initializeParticles() {
    if (!DOM.particlesCanvas) return;
    
    const ctx = DOM.particlesCanvas.getContext('2d');
    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150);
    
    function resizeCanvas() {
        DOM.particlesCanvas.width = window.innerWidth;
        DOM.particlesCanvas.height = window.innerHeight;
        initParticles();
    }
    
    function initParticles() {
        particles = [];
        const colors = STATE.theme === 'dark' 
            ? ['#00C9B1', '#2A5D8A', '#FF7A00']
            : ['#00C9B1', '#80F2D5', '#FF7A00'];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * DOM.particlesCanvas.width,
                y: Math.random() * DOM.particlesCanvas.height,
                radius: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, DOM.particlesCanvas.width, DOM.particlesCanvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > DOM.particlesCanvas.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > DOM.particlesCanvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('rgb', 'rgba');
            ctx.fill();
            
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particle.color.replace(')', `, ${0.2 * (1 - distance / 100)})`).replace('rgb', 'rgba');
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateParticles();
}

// ===== ФОРМА =====
function initializeForm() {
    if (!DOM.orderForm) return;
    
    // Загрузка сохранённых данных
    const savedFormData = localStorage.getItem(CONFIG.FORM_DATA_KEY);
    if (savedFormData) {
        try {
            STATE.formData = JSON.parse(savedFormData);
            Object.keys(STATE.formData).forEach(key => {
                const element = DOM.orderForm.querySelector(`[name="${key}"]`);
                if (element && STATE.formData[key]) {
                    element.value = STATE.formData[key];
                    if (element.parentElement.classList.contains('floating-label')) {
                        element.parentElement.classList.add('focused');
                    }
                }
            });
        } catch (e) { console.error(e); }
    }
    
    // Автосохранение
    DOM.orderForm.addEventListener('input', (e) => {
        const target = e.target;
        if (target.name && target.name !== 'captcha') {
            STATE.formData[target.name] = target.value;
            localStorage.setItem(CONFIG.FORM_DATA_KEY, JSON.stringify(STATE.formData));
        }
    });
    
    // Маска телефона
    const phoneInput = document.getElementById('orderPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
    }
    
    // Счётчик символов
    const messageTextarea = document.getElementById('orderMessage');
    if (messageTextarea && DOM.charCount) {
        messageTextarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            DOM.charCount.textContent = length;
            if (length > 500) {
                e.target.value = e.target.value.substring(0, 500);
                DOM.charCount.textContent = 500;
                DOM.charCount.style.color = '#D63031';
            } else if (length > 450) {
                DOM.charCount.style.color = '#FFC107';
            } else {
                DOM.charCount.style.color = '';
            }
        });
    }
    
    // Отправка
    DOM.orderForm.addEventListener('submit', handleFormSubmit);
    
    // Плавающие label
    document.querySelectorAll('.floating-label input, .floating-label select, .floating-label textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
    });
}

function formatPhone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (!value.startsWith('7') && !value.startsWith('8')) {
            value = '7' + value;
        }
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += '-' + value.substring(9, 11);
        }
        e.target.value = formatted.substring(0, 18);
    }
}

// Капча
function generateCaptcha() {
    captchaNum1 = Math.floor(Math.random() * 5) + 1; // 1-5
    captchaNum2 = Math.floor(Math.random() * 5) + 1;
    const emoji = '🚽'.repeat(captchaNum1) + ' + ' + '🚽'.repeat(captchaNum2) + ' = ?';
    if (DOM.captchaQuestion) {
        DOM.captchaQuestion.innerHTML = emoji;
    }
    if (DOM.captchaResult) {
        DOM.captchaResult.value = captchaNum1 + captchaNum2;
    }
}

function validateCaptcha() {
    const userAnswer = parseInt(DOM.captchaAnswer.value, 10);
    const correct = parseInt(DOM.captchaResult.value, 10);
    return userAnswer === correct;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateCaptcha()) {
        showError('Неверный ответ на проверочный вопрос. Попробуйте ещё раз.');
        generateCaptcha();
        DOM.captchaAnswer.value = '';
        return;
    }
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);
    
    if (!validateForm(formData)) return;
    
    submitBtn.classList.add('loading');
    
    try {
        const response = await fetch('send-form.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            showSuccessModal();
            form.reset();
            localStorage.removeItem(CONFIG.FORM_DATA_KEY);
            STATE.formData = {};
            document.querySelectorAll('.floating-label').forEach(label => {
                label.classList.remove('focused', 'has-value');
            });
            if (DOM.charCount) DOM.charCount.textContent = '0';
            generateCaptcha();
        } else {
            showError('Ошибка отправки. Попробуйте позже.');
        }
    } catch (error) {
        console.error(error);
        showError('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам по телефону ' + CONFIG.PHONE);
    } finally {
        submitBtn.classList.remove('loading');
    }
}

function validateForm(formData) {
    const phone = formData.get('phone');
    const email = formData.get('email');
    const name = formData.get('name');
    const agreement = formData.get('agreement');
    
    const phoneRegex = /^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[\-]?\d{2}[\-]?\d{2}$/;
    if (!phoneRegex.test(phone)) {
        showError('Пожалуйста, введите корректный номер телефона в формате +7 (999) 123-45-67');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Пожалуйста, введите корректный email адрес');
        return false;
    }
    if (name.length < 2) {
        showError('Имя должно содержать минимум 2 символа');
        return false;
    }
    if (!agreement) {
        showError('Необходимо согласие с политикой конфиденциальности');
        return false;
    }
    return true;
}

function showError(message) {
    // Создаём уведомление об ошибке
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
        <button class="error-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Стили для уведомления
    const style = document.createElement('style');
    style.textContent = `
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #FF5252, #D63031);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(214, 48, 49, 0.3);
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .error-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .error-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.2s;
        }
        
        .error-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(errorDiv);
    
    const closeBtn = errorDiv.querySelector('.error-close');
    closeBtn.addEventListener('click', () => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            errorDiv.remove();
            style.remove();
        }, 300);
    });
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                errorDiv.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// ===== FAQ =====
function initializeFAQ() {
    if (!DOM.faqQuestions || DOM.faqQuestions.length === 0) return;
    DOM.faqQuestions.forEach(question => {
        question.addEventListener('click', toggleFAQ);
    });
    // Открыть первый вопрос
    if (DOM.faqQuestions[0]) {
        toggleFAQ({ currentTarget: DOM.faqQuestions[0] });
    }
}

function toggleFAQ(e) {
    const question = e.currentTarget;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    const answer = question.nextElementSibling;
    
    DOM.faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
            otherQuestion.setAttribute('aria-expanded', 'false');
            otherQuestion.nextElementSibling.classList.remove('open');
            otherQuestion.nextElementSibling.style.maxHeight = null;
        }
    });
    
    question.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
        answer.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        answer.classList.remove('open');
        answer.style.maxHeight = null;
    }
}

// ===== SCROLL =====
function initializeScroll() {
    if (DOM.scrollTop) {
        DOM.scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function updateScrollTop() {
    if (!DOM.scrollTop) return;
    if (window.scrollY > 500) {
        DOM.scrollTop.classList.add('visible');
    } else {
        DOM.scrollTop.classList.remove('visible');
    }
}

function updatePageProgress() {
    if (!DOM.pageProgress) return;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    DOM.pageProgress.style.width = scrolled + '%';
}

// ===== МОДАЛЬНЫЕ ОКНА =====
function initializeModals() {
    document.addEventListener('click', (e) => {
        if (DOM.successModal && e.target === DOM.successModal) closeSuccessModal();
        if (DOM.privacyModal && e.target === DOM.privacyModal) closePrivacyModal();
        if (DOM.contractModal && e.target === DOM.contractModal) closeContractModal();
        if (DOM.requisitesModal && e.target === DOM.requisitesModal) closeRequisitesModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSuccessModal();
            closePrivacyModal();
            closeContractModal();
            closeRequisitesModal();
        }
    });
}

function showSuccessModal() {
    if (!DOM.successModal) return;
    DOM.successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const countdownElement = DOM.successModal.querySelector('.countdown-number');
    if (countdownElement) {
        let count = 15;
        const interval = setInterval(() => {
            count--;
            countdownElement.textContent = count;
            if (count <= 0) {
                clearInterval(interval);
                closeSuccessModal();
            }
        }, 1000);
    }
}
function closeSuccessModal() {
    if (!DOM.successModal) return;
    DOM.successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
function openPrivacyModal() {
    if (!DOM.privacyModal) return;
    DOM.privacyModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closePrivacyModal() {
    if (!DOM.privacyModal) return;
    DOM.privacyModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
function openContractModal() {
    if (!DOM.contractModal) return;
    DOM.contractModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeContractModal() {
    if (!DOM.contractModal) return;
    DOM.contractModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
function openRequisitesModal() {
    if (!DOM.requisitesModal) return;
    DOM.requisitesModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeRequisitesModal() {
    if (!DOM.requisitesModal) return;
    DOM.requisitesModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== АНИМАЦИИ СЧЁТЧИКОВ =====
function startCountAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    function updateCounter() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        counter.textContent = currentValue.toLocaleString('ru-RU');
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target.toLocaleString('ru-RU');
        }
    }
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
        }
    }, { threshold: 0.1 });
    observer.observe(counter);
}

// ===== УТИЛИТЫ =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = DOM.navbar.offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}

function selectModel(modelName) {
    STATE.currentModel = modelName;
    const notification = document.createElement('div');
    notification.className = 'model-notification';
    notification.innerHTML = `<div class="notification-content"><i class="fas fa-check-circle"></i><span>Модель "${modelName}" добавлена в заказ</span></div>`;
    // Добавляем стили для уведомления (если ещё нет)
    if (!document.querySelector('#model-notification-style')) {
        const style = document.createElement('style');
        style.id = 'model-notification-style';
        style.textContent = `
            .model-notification {
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: linear-gradient(135deg, #00C9B1, #2A5D8A);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 9999;
                box-shadow: 0 4px 20px rgba(0, 201, 177, 0.3);
                animation: slideInUp 0.3s ease;
                max-width: 300px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            @keyframes slideInUp {
                from { transform: translateY(100%); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes slideOutDown {
                from { transform: translateY(0); opacity: 1; }
                to { transform: translateY(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    setTimeout(() => scrollToSection('order'), 500);
}

// Глобальный API
window.BioEcoPro = {
    toggleTheme,
    scrollToSection,
    selectModel,
    openPrivacyModal,
    closePrivacyModal,
    openContractModal,
    closeContractModal,
    openRequisitesModal,
    closeRequisitesModal
};

// ===== PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(e => console.log(e));
    });
}