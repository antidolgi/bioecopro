// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И КОНФИГУРАЦИЯ =====
const CONFIG = {
    SITE_NAME: 'БИОЭКОПРО',
    SITE_URL: 'bio-ecopro.ru',
    PHONE: '+7-901-717-71-11',
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
    themeToggleHeader: null,
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
    captchaResult: null,
    servicesGrid: null,
    servicesContent: null,
    carouselSlides: null,
    carouselPrev: null,
    carouselNext: null,
    carouselDots: null,
    logoImg: null,
    selectedModelDisplay: null,
    selectedModelName: null,
    selectedModelInput: null,
    citySelect: null,
    otherCityGroup: null,
    otherCityInput: null
};

// Данные для капчи
let captchaNum1, captchaNum2;

// Данные для услуг (контент)
const servicesData = {
    construction: {
        title: 'Аренда кабин для стройки',
        description: 'Мобильные туалетные кабины для строительных объектов. Доставка по Москве/МО: 1500/2500 руб.',
        models: ['construction_std', 'construction_prem'],
        icon: 'assets/icons/stroyka.svg'
    },
    event: {
        title: 'Аренда кабин для мероприятий',
        description: 'Туалетные кабины для фестивалей, концертов, свадеб. Краткосрочная аренда с обслуживанием.',
        models: ['event_std', 'event_prem', 'event_accessible', 'event_shower_rent'],
        icon: 'assets/icons/toiletmodule.svg'
    },
    modules: {
        title: 'Аренда модулей для мероприятий',
        description: 'Стационарные и колесные туалетные модули для массовых мероприятий.',
        models: ['stationary_module', 'wheeled_module'],
        icon: 'assets/icons/music.svg'
    },
    maintenance: {
        title: 'Обслуживание и клининг',
        description: 'Регулярное обслуживание и клининг-менеджеры для вашего мероприятия.',
        models: ['maintenance_service', 'cleaning_manager'],
        icon: 'assets/icons/toilet-cleaning.svg'
    },
    water: {
        title: 'Доставка технической воды',
        description: 'Оперативная доставка воды для строительных объектов и мероприятий.',
        models: ['water_delivery'],
        icon: 'assets/icons/fuel-truck.svg'
    }
};
// Модели (данные для карточек) – с поддержкой нескольких изображений
const modelsData = {
    // Аренда для стройки
    construction_std: {
        name: 'Кабина "Стандарт" (стройка)',
        desc: 'Комплектация: бак 250л, 1100×1200×2200, вес 70кг, крючок для одежды, вентиляция, сидение для бака, бумагодержатель.',
        features: ['70 кг', '250 л', 'от 5 000 ₽/мес'],
        priceRent: '5 000 ₽/мес',
        priceSale: '32 500 ₽',
        images: ['model-standard-1.webp', 'model-standard-2.webp', 'model-standard-3.webp'],
        badge: 'popular',
        category: 'construction'
    },
    construction_prem: {
        name: 'Кабина "Премиум" (стройка)',
        desc: 'Комплектация: бак 250л, 1100×1200×2200, вес 80кг, + рукомойник, диспенсер для жидкого мыла, зеркало.',
        features: ['80 кг', '250 л', 'от 8 500 ₽/мес'],
        priceRent: '8 500 ₽/мес',
        priceSale: '37 000 ₽',
        images: ['model-premium-1.webp', 'model-premium-2.webp', 'model-premium-3.webp'],
        badge: 'hit',
        category: 'construction'
    },
    
    // Аренда для мероприятий (краткосрочная) - С ТАБАМИ ОБСЛУЖИВАНИЯ
    event_std: {
        name: 'Кабина для мероприятий (стандарт)',
        desc: 'Комплектация: бак 250л, 1100×1200×2200, вес 70кг.Крючок для одежды, вентиляция, бумагодержатель.',
        features: ['70 кг', '250 л', 'от 2 500 ₽/сут'],
        priceRent: '2 500 ₽/сут',
        priceSale: '',
        images: ['model-standard-4.webp', 'model-standard-5.webp'],
        badge: '',
        category: 'event',
        // ВАРИАНТЫ ОБСЛУЖИВАНИЯ ИЗ EXCEL
        maintenanceOptions: [
            { period: 'без обслуживания', price: '2 500', label: '2 500 ₽/сут' },
            { period: '1 раз в месяц', price: '7 500', label: '7 500 ₽/мес' },
            { period: '2 раза в месяц', price: '9 000', label: '9 000 ₽/мес' },
            { period: '1 раз в неделю', price: '10 500', label: '10 500 ₽/мес' }
        ]
    },
    event_prem: {
        name: 'Кабина для мероприятий (премиум)',
        desc: 'Комплектация: бак 250л, 1100×1200×2200, вес 80кг, + рукомойник, диспенсер, зеркало.',
        features: ['80 кг', '250 л', 'от 4 500 ₽/сут'],
        priceRent: '4 500 ₽/сут',
        priceSale: '',
        images: ['model-premium-4.webp', 'model-premium-5.webp'],
        badge: 'luxury',
        category: 'event',
        maintenanceOptions: [
            { period: 'без обслуживания', price: '4 500', label: '4 500 ₽/сут' },
            { period: '1 раз в месяц', price: '12 000', label: '12 000 ₽/мес' },
            { period: '2 раза в месяц', price: '15 000', label: '15 000 ₽/мес' },
            { period: '1 раз в неделю', price: '18 000', label: '18 000 ₽/мес' }
        ]
    },
    event_accessible: {
        name: 'Инвалидная кабина',
        desc: 'Увеличенные габариты, поручни, угловой Бак-резервуар, специальное оборудование для маломобильных граждан.',
        features: ['120 кг', '300 л', 'от 5 500 ₽/сут'],
        priceRent: '5 500 ₽/сут',
        priceSale: '',
        images: ['model-accessible-1.webp', 'model-accessible-2.webp'],
        badge: 'new',
        category: 'event',
        maintenanceOptions: [
            { period: 'без обслуживания', price: '5 500', label: '5 500 ₽/сут' },
            { period: '1 раз в месяц', price: '14 000', label: '14 000 ₽/мес' }
        ]
    },
        event_shower_rent: {
    name: 'Аренда мобильной душевой кабины (ТЭН)',
    desc: 'Бак с ТЭНом, душ-лейка, сифон, крючок для одежды, запирающий механизм, полка для мыла, ТЭН 2 кВт с регулятором температуры.',
    features: ['180 л', 'ТЭН 2 кВт', '12 500 ₽/мес'],
    priceRent: '12 500 ₽/мес',
    priceSale: '',
    images: ['model-shower-1.webp', 'model-shower-2.webp'],
    badge: 'new',
    category: 'event',
    maintenanceOptions: [
        { period: 'базовая аренда', price: '12 500', label: '12 500 ₽/мес' }
    ]
    },
    
    // Модули
    stationary_module: {
        name: 'Стационарный модуль',
        desc: '2-10 туалетов, рукомойник в каждом, точечное освещение, отопление. Пропускная способность 150–2500 посещений.',
        features: ['2-10 кабин', 'отопление', 'от 65 000 ₽'],
        priceRent: 'от 65 000 ₽',
        priceSale: '',
        images: ['model-module-1.webp', 'model-module-2.webp'],
        badge: 'new',
        category: 'modules'
    },
    wheeled_module: {
        name: 'Колёсный модуль',
        desc: '2-8 туалетов, рукомойник, точечное освещение, отопление/кондиционирование, премиальная отделка.',
        features: ['2-8 кабин', 'кондиционер', 'от 5 500 ₽/сут'],
        priceRent: 'от 5 500 ₽/сут',
        priceSale: '',
        images: ['model-wheeled-1.webp', 'model-wheeled-2.webp'],
        badge: 'new',
        category: 'modules'
    },
    
    // Обслуживание и клининг
    maintenance_service: {
        name: 'Обслуживание туалетных кабин',
        desc: 'Откачка ёмкости, заправка дезодорирующей жидкости (противогололедного реагента), уборка кабины, 1 рулон туалетной бумаги.',
        features: ['выезд', '1 500 ₽'],
        priceRent: '1 500 ₽',
        priceSale: '',
        images: ['service-maintenance.webp'],
        badge: '',
        category: 'maintenance'
    },
    cleaning_manager: {
        name: 'Клининг-менеджер для мероприятия',
        desc: 'Выезд специалиста для контроля чистоты на мероприятии.',
        features: ['выезд', 'от 8 500 ₽'],
        priceRent: 'от 8 500 ₽',
        priceSale: '',
        images: ['service-cleaning.webp'],
        badge: '',
        category: 'maintenance'
    },
    
    // Доставка воды
    water_delivery: {
    name: 'Доставка технической воды',
    desc: 'Вода для строительных объектов и мероприятий. Цена зависит от объёма и расстояния.',
    features: ['от 1 200 ₽/м³', 'до 30 км от МКАД', 'от 1 м³'],
    priceRent: 'от 1 200 ₽/м³',
    priceSale: '',
    images: ['service-water.webp'],
    badge: '',
    category: 'water',
    // ТАБЛИЦА ЦЕН НА ВОДУ
    waterPricing: [
        {
            zone: 'В ПРЕДЕЛАХ МКАД',
            rows: [
                { volume: 'Доставка 1 куба', price: '2 000 ₽/м³' },
                { volume: 'Доставка до 2 кубов', price: '1 500 ₽/м³' },
                { volume: 'Доставка 2-4 кубов', price: '1 200 ₽/м³' }
            ]
        },
        {
            zone: 'ДО 30 КМ ОТ МКАД',
            rows: [
                { volume: 'Доставка 1 куба', price: '2 500 ₽/м³' },
                { volume: 'Доставка до 2 кубов', price: '2 000 ₽/м³' },
                { volume: 'Доставка 2-4 кубов', price: '1 400 ₽/м³' },
                { volume: 'Доставка от 9 м³', price: 'по договорённости' }
            ]
        }
    ]
},
    
    // Продажа
    sale_std: {
        name: 'МТК "Стандарт" (продажа)',
        desc: 'Комплектация: бак 250л, 1100×1200×2200, вес 70кг, крючок для одежды, вентиляция, сидение для бака, бумагодержатель.',
        features: ['70 кг', '250 л', 'гарантия 1 год'],
        priceRent: '',
        priceSale: '32 500 ₽',
        images: ['model-standard-6.webp', 'model-standard-7.webp', 'model-standard-8.webp'],
        badge: 'popular',
        category: 'sale'
    },
    sale_shower: {
        name: 'Мобильная душевая кабина (МДК)',
        desc: 'Бак 180л с ТЭНом, душ-лейка, сифон, крючок для одежды, запирающий механизм, полка для мыла, ТЭН 2 кВт с регулятором температуры (40-80°C), пластиковый поддон. Габариты: 1100×1100×2650, вес 85кг.',
        features: ['180 л', 'ТЭН 2 кВт', '45 000 ₽'],
        priceRent: '',
        priceSale: '45 000 ₽',
        images: ['model-shower-3.webp', 'model-shower-4.webp'],
        badge: 'new',
        category: 'sale'
    }
};
// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    console.log(`%c🚀 ${CONFIG.SITE_NAME} v2.0`, 'font-size: 20px; color: #00C9B1; font-weight: bold;');
    
    initializeDOM();
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initializeForm();
    initializeFAQ();
    initializeScroll();
    initializeModals();
    generateCaptcha();
    initializeServices();
    renderAllModels();
    initCarousel();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
        startCountAnimations();
    }, 100);
});

// ===== ИНИЦИАЛИЗАЦИЯ DOM =====
function initializeDOM() {
    DOM.themeToggle = document.querySelector('.theme-toggle');
    DOM.themeToggleHeader = document.getElementById('themeToggleHeader');
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
    DOM.servicesGrid = document.getElementById('servicesGrid');
    DOM.servicesContent = document.getElementById('servicesContent');
    DOM.carouselSlides = document.querySelectorAll('.carousel-slide');
    DOM.carouselPrev = document.querySelector('.carousel-prev');
    DOM.carouselNext = document.querySelector('.carousel-next');
    DOM.carouselDots = document.getElementById('heroCarouselDots');
    DOM.logoImg = document.getElementById('logoImg');
    DOM.selectedModelDisplay = document.getElementById('selectedModelDisplay');
    DOM.selectedModelName = document.getElementById('selectedModelName');
    DOM.selectedModelInput = document.getElementById('selectedModel');
    DOM.citySelect = document.getElementById('orderCity');
    DOM.otherCityGroup = document.getElementById('otherCityGroup');
    DOM.otherCityInput = document.getElementById('otherCity');
}

// ===== ТЕМА =====
function initializeTheme() {
    const savedTheme = localStorage.getItem(CONFIG.THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    STATE.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', STATE.theme);
    updateLogo();
    
    if (DOM.themeToggleHeader) {
        DOM.themeToggleHeader.addEventListener('click', toggleTheme);
    }
    if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', STATE.theme);
    localStorage.setItem(CONFIG.THEME_KEY, STATE.theme);
    updateLogo();
    if (DOM.particlesCanvas) {
        initializeParticles();
    }
    if (DOM.themeToggleHeader) {
        DOM.themeToggleHeader.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            DOM.themeToggleHeader.style.transform = 'rotate(0)';
        }, 300);
    }
}

function updateLogo() {
    if (DOM.logoImg) {
        DOM.logoImg.src = STATE.theme === 'light' ? 'assets/images/logo.png' : 'assets/images/logo1.png';
    }
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

// ===== ЧАСТИЦЫ =====
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

// ===== КАРУСЕЛЬ =====
function initCarousel() {
    if (!DOM.carouselSlides.length) return;
    
    let currentSlide = 0;
    const slides = DOM.carouselSlides;
    const totalSlides = slides.length;
    
    // Создаём точки
    if (DOM.carouselDots) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToSlide(i));
            DOM.carouselDots.appendChild(dot);
        }
    }
    
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        currentSlide = index;
        updateActiveDot(index);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    if (DOM.carouselNext) {
        DOM.carouselNext.addEventListener('click', nextSlide);
    }
    if (DOM.carouselPrev) {
        DOM.carouselPrev.addEventListener('click', prevSlide);
    }
    
    // Автоматическое переключение каждые 5 секунд
    setInterval(nextSlide, 5000);
}

// ===== УСЛУГИ =====
function initializeServices() {
    if (!DOM.servicesGrid || !DOM.servicesContent) return;
    const cards = DOM.servicesGrid.querySelectorAll('.service-card');
    
    // Подставляем иконки из servicesData
    cards.forEach(card => {
        const serviceId = card.dataset.service;
        const serviceData = servicesData[serviceId];
        
        if (serviceData && serviceData.icon) {
            const iconDiv = card.querySelector('.service-icon');
            if (iconDiv) {
                iconDiv.innerHTML = `<img src="${serviceData.icon}" alt="${serviceData.title}" width="48" height="48">`;
            }
        }
        
        card.addEventListener('click', () => {
            const service = card.dataset.service;
            setActiveService(service);
        });
    });
    
    setActiveService('construction');
}

function setActiveService(serviceId) {
    const cards = DOM.servicesGrid.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.service === serviceId) {
            card.classList.add('active');
        }
    });
    
    renderServiceContent(serviceId);
}

function renderServiceContent(serviceId) {
    const data = servicesData[serviceId];
    if (!data) return;
    
    let html = `<div class="service-content-block active">`;
    html += `<h3>${data.title}</h3>`;
    html += `<p>${data.description}</p>`;
    if (data.models) {
        html += `<div class="models-grid service-models">`;
        data.models.forEach(modelId => {
            const model = modelsData[modelId];
            if (model) {
                html += renderModelCard(model, serviceId);
            }
        });
        html += `</div>`;
    }
    html += `</div>`;
    DOM.servicesContent.innerHTML = html;
    
    // Добавляем обработчики для табов
    setTimeout(() => attachTabListeners(), 100);
}

// Функция для рендеринга карточки модели с галереей
function renderModelCard(model, serviceType) {
    const price = serviceType === 'sale' ? model.priceSale : model.priceRent;
    const badgeClass = model.badge ? `model-badge ${model.badge}` : '';
    const badgeText = model.badge ? (model.badge === 'popular' ? 'Популярный' : model.badge === 'hit' ? 'Хит' : model.badge === 'luxury' ? 'Люкс' : 'Новинка') : '';
    
    // Галерея миниатюр
    let galleryHtml = '';
    if (model.images && model.images.length > 1) {
        galleryHtml = '<div class="model-gallery">';
        model.images.forEach((img, index) => {
            galleryHtml += `<div class="model-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(this, '${img}')"><img src="assets/images/${img}" alt="${model.name}"></div>`;
        });
        galleryHtml += '</div>';
    }
    
    const mainImage = model.images ? model.images[0] : (model.img || 'default.jpg');
    
    // Табы для вариантов обслуживания
    let pricingTabsHtml = '';
    if (model.maintenanceOptions && model.maintenanceOptions.length > 0) {
        pricingTabsHtml = `
            <div class="pricing-tabs">
                <div class="tab-header">
                    <span class="tab-label"><i class="fas fa-info-circle"></i> Варианты обслуживания:</span>
                </div>
                <div class="tab-options">
                    ${model.maintenanceOptions.map((opt, idx) => `
                        <button class="tab-option ${idx === 0 ? 'active' : ''}" 
                                data-price="${opt.price}" 
                                data-period="${opt.period}">
                            <span class="opt-period">${opt.period}</span>
                            <span class="opt-price">${opt.price} ₽/сут</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    // Таблица цен на воду (если есть waterPricing)
let waterPricingHtml = '';
if (model.waterPricing && model.waterPricing.length > 0) {
    waterPricingHtml = `
        <div class="water-pricing-table">
            ${model.waterPricing.map(zone => `
                <div class="water-zone">
                    <h4 class="water-zone-title">${zone.zone}</h4>
                    <table class="water-table">
                        ${zone.rows.map(row => `
                            <tr>
                                <td class="water-volume">${row.volume}</td>
                                <td class="water-price">${row.price}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            `).join('')}
        </div>
    `;
}
    
    return `
        <div class="model-card" data-category="${model.category || ''}">
            ${badgeClass ? `<div class="${badgeClass}">${badgeText}</div>` : ''}
            <div class="model-image" id="model-image-${model.name.replace(/\s+/g, '-').toLowerCase()}">
                <img src="assets/images/${mainImage}" alt="${model.name}" loading="lazy">
            </div>
            ${galleryHtml}
            <div class="model-info">
                <h3>${model.name}</h3>
                <p class="model-desc">${model.desc}</p>
                <div class="model-features">
                    ${model.features.map(f => `<span><i class="fas fa-check"></i> ${f}</span>`).join('')}
                </div>
                ${pricingTabsHtml}
                ${waterPricingHtml}
                <div class="model-price">
                    <span class="price-current" id="price-${model.name.replace(/\s+/g, '-').toLowerCase()}">${price}</span>
                </div>
                <button class="btn btn-primary btn-block" onclick="selectModel('${model.name}')">
                    <i class="fas fa-cart-plus"></i> Выбрать
                </button>
            </div>
        </div>
    `;
}
// Обработчик переключения табов
function attachTabListeners() {
    document.querySelectorAll('.tab-option').forEach(tab => {
        tab.addEventListener('click', function() {
            const parent = this.closest('.tab-options');
            parent.querySelectorAll('.tab-option').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const price = this.dataset.price;
            const period = this.dataset.period;
            const card = this.closest('.model-card');
            const priceElement = card.querySelector('.price-current');
            
            if (priceElement) {
                priceElement.style.opacity = '0';
                setTimeout(() => {
                    priceElement.textContent = `${price} ₽/сут${period !== 'без обслуживания' ? ` (${period})` : ''}`;
                    priceElement.style.opacity = '1';
                }, 200);
            }
        });
    });
}

// Глобальная функция для смены главного изображения при клике на миниатюру
window.changeMainImage = function(thumb, imgSrc) {
    const card = thumb.closest('.model-card');
    const mainImageContainer = card.querySelector('.model-image img');
    if (mainImageContainer) {
        mainImageContainer.src = 'assets/images/' + imgSrc;
    }
    // Убираем активный класс у всех миниатюр и добавляем текущей
    const thumbs = card.querySelectorAll('.model-thumbnail');
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
};

// ===== КАТАЛОГ ВСЕХ МОДЕЛЕЙ (для продажи) =====
function renderAllModels() {
    const container = document.getElementById('modelsGrid');
    if (!container) return;
    let html = '';
    // Для продажи показываем модели sale_std и sale_shower
    const saleModels = ['sale_std', 'sale_shower'];
    saleModels.forEach(id => {
        const model = modelsData[id];
        if (model) {
            html += renderModelCard(model, 'sale');
        }
    });
    container.innerHTML = html;
}

// ===== ВЫБОР МОДЕЛИ =====
function selectModel(modelName) {
    STATE.currentModel = modelName;
    DOM.selectedModelInput.value = modelName;
    DOM.selectedModelName.textContent = modelName;
    DOM.selectedModelDisplay.style.display = 'block';
    
    // Уведомление
    const notification = document.createElement('div');
    notification.className = 'model-notification';
    notification.innerHTML = `<div class="notification-content"><i class="fas fa-check-circle"></i><span>Модель "${modelName}" добавлена в заказ</span></div>`;
    
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
    
    // Обработка выбора города
    if (DOM.citySelect) {
        DOM.citySelect.addEventListener('change', function() {
            if (this.value === 'other') {
                DOM.otherCityGroup.style.display = 'block';
                DOM.otherCityInput.required = true;
            } else {
                DOM.otherCityGroup.style.display = 'none';
                DOM.otherCityInput.required = false;
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
            formatted += ' ' + value.substring(1, 4);
        }
        if (value.length >= 5) {
            formatted += ' ' + value.substring(4, 7);
        }
        if (value.length >= 8) {
            formatted += ' ' + value.substring(7, 9);
        }
        if (value.length >= 10) {
            formatted += ' ' + value.substring(9, 11);
        }
        e.target.value = formatted;
    }
}

function generateCaptcha() {
    captchaNum1 = Math.floor(Math.random() * 5) + 1;
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
    
    // Если выбран "Другой" город, подменяем city на введённое значение
    if (DOM.citySelect.value === 'other') {
        const otherCity = DOM.otherCityInput.value.trim();
        if (!otherCity) {
            showError('Введите название города');
            return;
        }
        formData.set('city', otherCity);
    }
    
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
            DOM.selectedModelDisplay.style.display = 'none'; // скрываем выбранную модель
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
    const name = formData.get('name');
    const agreement = formData.get('agreement');
    
    const phoneRegex = /^\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/;
    if (!phoneRegex.test(phone)) {
        showError('Пожалуйста, введите корректный номер телефона в формате +7 999 123 45 67');
        return false;
    }
    // email необязателен, проверяем только если заполнен
    const email = formData.get('email');
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('Пожалуйста, введите корректный email адрес');
            return false;
        }
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
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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
        answer.style.maxHeight = answer.scrollHeight + '20px';
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

// Глобальный API для вызова из HTML
window.BioEcoPro = {
    toggleTheme,
    scrollToSection,
    selectModel,
    openPrivacyModal,
    closePrivacyModal,
    openContractModal,
    closeContractModal,
    openRequisitesModal,
    closeRequisitesModal,
    setService: setActiveService
};

// ===== PWA =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(e => console.log(e));
    });
}