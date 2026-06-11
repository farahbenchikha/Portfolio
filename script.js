// ==================== SCRIPT.JS - VERSION CORRIGÉE ====================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== LOADER ====================
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hide');
            }, 1000);
        }
    });

    // ==================== NAVBAR SCROLL EFFECT ====================
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ==================== MOBILE MENU ====================
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // ==================== ACTIVE LINK HIGHLIGHTING ====================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==================== PROJECT CAROUSELS ====================
    if (typeof Swiper !== 'undefined') {
        document.querySelectorAll('.project-carousel').forEach((carousel) => {
            new Swiper(carousel, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: carousel.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: carousel.querySelector('.swiper-button-next'),
                    prevEl: carousel.querySelector('.swiper-button-prev'),
                },
            });
        });

        // ==================== ACHIEVEMENT CAROUSELS ====================
        document.querySelectorAll('.achievement-carousel').forEach((carousel) => {
            new Swiper(carousel, {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                pagination: {
                    el: carousel.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: carousel.querySelector('.swiper-button-next'),
                    prevEl: carousel.querySelector('.swiper-button-prev'),
                },
            });
        });
    }

    // ==================== ANIMATED CIRCLES ====================
    const circles = document.querySelectorAll('.stat-circle');
    circles.forEach(circle => {
        const value = circle.dataset.value;
        if (value) {
            const angle = (parseInt(value) / 100) * 360;
            circle.style.background = `conic-gradient(var(--primary) 0deg ${angle}deg, var(--border) ${angle}deg 360deg)`;
        }
    });

    // ==================== ROTATING TEXT ANIMATION ====================
    function initRotatingText() {
        const rotatingWords = document.querySelectorAll('.rotating-word');
        console.log('Found rotating words:', rotatingWords.length);
        
        if (rotatingWords.length === 0) return;
        
        let currentIndex = 0;
        let intervalId;
        
        // Afficher le premier mot
        rotatingWords.forEach((word, idx) => {
            if (idx === 0) {
                word.classList.add('active');
            } else {
                word.classList.remove('active');
            }
        });
        
        function nextWord() {
            // Enlever la classe active du mot courant
            rotatingWords[currentIndex].classList.remove('active');
            rotatingWords[currentIndex].classList.add('exit');
            
            // Passer au mot suivant
            currentIndex = (currentIndex + 1) % rotatingWords.length;
            
            // Afficher le nouveau mot
            setTimeout(() => {
                rotatingWords[currentIndex].classList.remove('exit');
                rotatingWords[currentIndex].classList.add('active');
            }, 100);
        }
        
        // Démarrer le défilement
        intervalId = setInterval(nextWord, 2500);
        
        // Ralentir au survol
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(intervalId);
                intervalId = setInterval(nextWord, 4000);
            });
            heroSection.addEventListener('mouseleave', () => {
                clearInterval(intervalId);
                intervalId = setInterval(nextWord, 2500);
            });
        }
    }
    
    // Appeler la fonction d'animation
    initRotatingText();

    // ==================== CONTACT FORM ====================
    // ==================== CONTACT FORM - EMAILJS ====================
// Configuration EmailJS (remplie avec TES clés)
const EMAILJS_PUBLIC_KEY = 'bsqpN14022adOzmqk';
const EMAILJS_SERVICE_ID = 'service_8knug54';
const EMAILJS_TEMPLATE_ID = 'template_hoy8hl9';

// Initialiser EmailJS au chargement de la page
(function initEmailJS() {
    // Vérifier si EmailJS est déjà chargé
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS déjà chargé et initialisé');
        return;
    }
    
    // Charger EmailJS SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('✅ EmailJS prêt à recevoir des messages !');
    };
    script.onerror = () => {
        console.log('❌ Erreur chargement EmailJS');
    };
    document.head.appendChild(script);
})();

// Gérer l'envoi du formulaire
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

function showMessage(message, type) {
    if (formResponse) {
        formResponse.innerHTML = `<div class="form-response ${type}">${message}</div>`;
        setTimeout(() => {
            formResponse.innerHTML = '';
        }, 5000);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Validation
        if (!name || !email || !message) {
            showMessage(' Please fill in all fields', 'error');
            return;
        }
        
        // Validation email simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(' Please enter a valid email address', 'error');
            return;
        }
        
        // Désactiver le bouton pendant l'envoi
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Send';
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
        }
        
        // Envoyer via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            name: name,
            email: email,
            message: message,
        })
        .then(() => {
            showMessage(' Message sent successfully! I will reply soon.', 'success');
            contactForm.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            showMessage(' Error sending message. Please try again or email me directly.', 'error');
        })
        .finally(() => {
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });
}

    // ==================== CUSTOM CURSOR ====================
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });
    
    const hoverElements = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .project-card, .service-card, .achievement-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.borderColor = 'var(--primary-light)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });

    // ==================== PARTICLES EFFECT ====================
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const colors = ['#e91e63', '#9c27b0', '#ff6e7f', '#f06292', '#ce93d8'];
        
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.4;
            particle.style.pointerEvents = 'none';
            particle.style.animation = `floatParticle ${Math.random() * 15 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 10 + 's';
            container.appendChild(particle);
        }
    }
    
    if (!document.querySelector('#particle-style')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-style';
        particleStyle.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
                100% { transform: translateY(-200px) translateX(100px); opacity: 0; }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    createParticles();

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.service-card, .project-card, .cert-card, .timeline-item, .achievement-card, .language-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(animateStyle);

    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const scrolled = window.scrollY;
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    
    
    console.log('Portfolio chargé avec succès !');
});


// ==================== CUSTOM CURSOR PREMIUM (Effet Aziz amélioré) ====================
// ==================== CUSTOM CURSOR - VERSION SIMPLE ====================
(function initCustomCursor() {
    // Vérifier si le curseur existe déjà
    if (document.querySelector('.custom-cursor')) return;
    
    // Créer les éléments
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Suivre la souris
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Position directe du point
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Animation fluide pour le cercle
    function animate() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Ajouter les effets de survol
    const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .project-card, .service-card, .nav-link, .cert-card, .footer-social a, .project-links a');
    
    interactiveElements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
    
    // Effet de clic
    document.addEventListener('mousedown', function() {
        cursor.classList.add('click');
    });
    document.addEventListener('mouseup', function() {
        setTimeout(function() {
            cursor.classList.remove('click');
        }, 100);
    });
    
    // Masquer quand on quitte la fenêtre
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
    
    console.log('Curseur personnalisé activé !');
})();