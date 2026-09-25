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
    
    const animateElements = document.querySelectorAll('.service-card, .project-card, .cert-card, .timeline-item, .achievement-card, .language-card, .skill-category-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    const animateStyle = document.createElement('style');
    animateStyle.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(animateStyle);

    // ==================== INTERACTIVE HERO (SRI TECH STYLE) ====================
    function initInteractiveHero() {
        const canvas = document.getElementById('characterCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const contextualText = document.getElementById('contextualText');
        const messageBox = document.getElementById('contextualMessageBox');
        const interactionZones = document.getElementById('interactionZones');
        const heroSection = document.querySelector('.interactive-hero');

        if (!ctx) return;

        let currentState = 'working';
        let targetState = 'working';
        let greetingTimer = null;
        let lookTimeout = null;

        const current = {
            headAngle: 0,
            headOffsetX: 0,
            eyeOffsetX: 0,
            eyeOffsetY: 1,
            headsetPosition: 0,
            rightArmAngle: 0,
            leftArmAngle: 0,
            mouthState: 'smile'
        };

        const target = {
            headAngle: 0,
            headOffsetX: 0,
            eyeOffsetX: 0,
            eyeOffsetY: 1,
            headsetPosition: 0,
            rightArmAngle: 0,
            leftArmAngle: 0,
            mouthState: 'smile'
        };

        function lerp(start, end, factor) {
            return start + (end - start) * factor;
        }

        function setMessage(text) {
            if (!contextualText) return;
            if (contextualText.textContent === text) return;
            
            if (messageBox) {
                messageBox.style.opacity = '0';
                messageBox.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    contextualText.textContent = text;
                    messageBox.style.opacity = '1';
                    messageBox.style.transform = 'translateY(0)';
                }, 150);
            } else {
                contextualText.textContent = text;
            }
        }

        function triggerZone(zoneName) {
            if (currentState.startsWith('greeting')) {
                return;
            }

            if (zoneName === 'left') {
                targetState = 'look_left';
                setMessage('Scanning Cloud Infra & AWS Clusters!');
                target.headAngle = -0.12;
                target.headOffsetX = -12;
                target.eyeOffsetX = -8;
                target.eyeOffsetY = 0;
                target.headsetPosition = 0;
                target.rightArmAngle = 0;
                target.leftArmAngle = 0;
                target.mouthState = 'smile';

                clearTimeout(lookTimeout);
                lookTimeout = setTimeout(() => {
                    if (targetState === 'look_left') {
                        resetToWorking();
                    }
                }, 2500);

            } else if (zoneName === 'right') {
                targetState = 'look_right';
                setMessage('Deploying DevSecOps Shields & AI Pipelines!');
                target.headAngle = 0.12;
                target.headOffsetX = 12;
                target.eyeOffsetX = 8;
                target.eyeOffsetY = 0;
                target.headsetPosition = 0;
                target.rightArmAngle = 0;
                target.leftArmAngle = 0;
                target.mouthState = 'smile';

                clearTimeout(lookTimeout);
                lookTimeout = setTimeout(() => {
                    if (targetState === 'look_right') {
                        resetToWorking();
                    }
                }, 2500);

            } else if (zoneName === 'center') {
                startGreetingSequence();
            }
        }

        function resetToWorking() {
            targetState = 'working';
            currentState = 'working';
            setMessage('Move cursor to interact with me !');
            target.headAngle = 0;
            target.headOffsetX = 0;
            target.eyeOffsetX = 0;
            target.eyeOffsetY = 1;
            target.headsetPosition = 0;
            target.rightArmAngle = 0;
            target.leftArmAngle = 0;
            target.mouthState = 'smile';
        }

        function startGreetingSequence() {
            if (greetingTimer) clearTimeout(greetingTimer);
            clearTimeout(lookTimeout);

            currentState = 'greeting_1';
            targetState = 'greeting_1';
            setMessage("Hey! I'm Farah! Welcome to my tech universe!");
            target.headAngle = 0;
            target.headOffsetX = 0;
            target.eyeOffsetX = 0;
            target.eyeOffsetY = 0;
            target.headsetPosition = 1;
            target.leftArmAngle = 1;
            target.rightArmAngle = 0;
            target.mouthState = 'talk';

            greetingTimer = setTimeout(() => {
                currentState = 'greeting_2';
                targetState = 'greeting_2';
                setMessage("I design secure Cloud, DevSecOps & AI architectures!");
                target.headAngle = 0.05;
                target.leftArmAngle = 0;
                target.rightArmAngle = 1;
                target.mouthState = 'smile';

                greetingTimer = setTimeout(() => {
                    currentState = 'greeting_3';
                    targetState = 'greeting_3';
                    setMessage("Check out my featured projects below!");
                    target.headAngle = 0;
                    target.eyeOffsetY = 4;
                    target.rightArmAngle = 2;
                    target.mouthState = 'smile';

                    greetingTimer = setTimeout(() => {
                        resetToWorking();
                    }, 3200);

                }, 2000);

            }, 1600);
        }

        function initRoleRotator() {
            const roleEl = document.getElementById('dynamicRole');
            if (!roleEl) return;
            const roles = [
                'Cloud & DevOps Engineer',
                'DevSecOps Architecture',
                'AIOps & ML Systems',
                'Kubernetes & Infrastructure'
            ];
            let roleIdx = 0;
            setInterval(() => {
                roleEl.style.opacity = '0';
                setTimeout(() => {
                    roleIdx = (roleIdx + 1) % roles.length;
                    roleEl.textContent = roles[roleIdx];
                    roleEl.style.opacity = '1';
                }, 300);
            }, 3200);
        }
        initRoleRotator();

        if (interactionZones) {
            const zones = interactionZones.querySelectorAll('.zone');
            zones.forEach(zone => {
                zone.addEventListener('mouseenter', () => {
                    const z = zone.getAttribute('data-zone');
                    if (z) triggerZone(z);
                });
            });

            if (heroSection) {
                heroSection.addEventListener('mousemove', (e) => {
                    if (currentState.startsWith('greeting')) return;
                    const rect = heroSection.getBoundingClientRect();
                    const relativeX = (e.clientX - rect.left) / rect.width;

                    if (relativeX < 0.33) {
                        if (targetState !== 'look_left') triggerZone('left');
                    } else if (relativeX > 0.66) {
                        if (targetState !== 'look_right') triggerZone('right');
                    } else {
                        if (!currentState.startsWith('greeting') && targetState !== 'greeting_1') {
                            triggerZone('center');
                        }
                    }
                });
            }
        }

        canvas.addEventListener('click', () => {
            startGreetingSequence();
        });

        let startTime = performance.now();

        function render(now) {
            const time = (now - startTime) * 0.001;

            current.headAngle = lerp(current.headAngle, target.headAngle, 0.08);
            current.headOffsetX = lerp(current.headOffsetX, target.headOffsetX, 0.08);
            current.eyeOffsetX = lerp(current.eyeOffsetX, target.eyeOffsetX, 0.1);
            current.eyeOffsetY = lerp(current.eyeOffsetY, target.eyeOffsetY, 0.1);
            current.headsetPosition = lerp(current.headsetPosition, target.headsetPosition, 0.06);
            current.rightArmAngle = lerp(current.rightArmAngle, target.rightArmAngle, 0.08);
            current.leftArmAngle = lerp(current.leftArmAngle, target.leftArmAngle, 0.08);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const charX = centerX + current.headOffsetX * 0.5;
            const charY = 240;

            drawHolograms(ctx, canvas.width, canvas.height, time);
            drawDesk(ctx, canvas.width, canvas.height);
            drawTorso(ctx, charX, charY);
            drawArms(ctx, charX, charY, current, time);
            drawLaptop(ctx, centerX, 350, time);
            drawHead(ctx, charX, charY - 60, current, time);
            drawHeadset(ctx, charX, charY - 60, current);

            requestAnimationFrame(render);
        }

        function drawHolograms(ctx, w, h, time) {
            ctx.save();
            
            // Hologram 1: Cloud Infra (Top Left)
            const cloudX = 90 + Math.sin(time * 1.5) * 8;
            const cloudY = 110 + Math.cos(time * 1.2) * 10;
            
            ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
            ctx.beginPath();
            ctx.arc(cloudX, cloudY, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cloudX, cloudY, 26, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#38BDF8';
            ctx.beginPath();
            ctx.arc(cloudX - 6, cloudY + 2, 7, 0, Math.PI * 2);
            ctx.arc(cloudX + 6, cloudY + 2, 6, 0, Math.PI * 2);
            ctx.arc(cloudX, cloudY - 4, 9, 0, Math.PI * 2);
            ctx.fill();

            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillStyle = '#0284C7';
            ctx.textAlign = 'center';
            ctx.fillText('AWS CLOUD', cloudX, cloudY + 38);

            // Hologram 2: DevSecOps Shield (Top Right)
            const secX = w - 90 + Math.cos(time * 1.6) * 8;
            const secY = 100 + Math.sin(time * 1.4) * 10;
            
            ctx.fillStyle = 'rgba(244, 63, 94, 0.15)';
            ctx.beginPath();
            ctx.arc(secX, secY, 30, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(secX, secY, 26, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#F43F5E';
            ctx.beginPath();
            ctx.moveTo(secX, secY - 10);
            ctx.lineTo(secX + 10, secY - 5);
            ctx.lineTo(secX + 8, secY + 5);
            ctx.quadraticCurveTo(secX, secY + 14, secX, secY + 14);
            ctx.quadraticCurveTo(secX, secY + 14, secX - 8, secY + 5);
            ctx.lineTo(secX - 10, secY - 5);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#E11D48';
            ctx.fillText('DEVSECOPS', secX, secY + 38);

            // Hologram 3: AIOps (Middle Right)
            const aiX = w - 70 + Math.sin(time * 2.1) * 6;
            const aiY = 250 + Math.cos(time * 1.8) * 8;

            ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
            ctx.beginPath();
            ctx.arc(aiX, aiY, 26, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(aiX, aiY, 22, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = '#A855F7';
            ctx.beginPath();
            ctx.arc(aiX - 7, aiY - 5, 3.5, 0, Math.PI * 2);
            ctx.arc(aiX + 7, aiY - 5, 3.5, 0, Math.PI * 2);
            ctx.arc(aiX, aiY + 7, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#A855F7';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(aiX - 7, aiY - 5);
            ctx.lineTo(aiX + 7, aiY - 5);
            ctx.lineTo(aiX, aiY + 7);
            ctx.closePath();
            ctx.stroke();

            ctx.fillStyle = '#9333EA';
            ctx.fillText('AIOps', aiX, aiY + 34);

            ctx.restore();
        }

        function drawDesk(ctx, w, h) {
            ctx.save();
            ctx.fillStyle = 'rgba(74, 21, 37, 0.08)';
            ctx.beginPath();
            ctx.ellipse(w / 2, 420, 220, 35, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1E293B';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(60, 410, w - 120, 20, 10);
            } else {
                ctx.rect(60, 410, w - 120, 20);
            }
            ctx.fill();

            const deskGrad = ctx.createLinearGradient(0, 410, 0, 490);
            deskGrad.addColorStop(0, '#334155');
            deskGrad.addColorStop(1, '#0F172A');
            ctx.fillStyle = deskGrad;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(70, 420, w - 140, 80, [0, 0, 15, 15]);
            } else {
                ctx.rect(70, 420, w - 140, 80);
            }
            ctx.fill();
            ctx.restore();
        }

        function drawTorso(ctx, x, y) {
            ctx.save();
            const sweaterGrad = ctx.createLinearGradient(x - 60, y, x + 60, y + 160);
            sweaterGrad.addColorStop(0, '#8C2D42');
            sweaterGrad.addColorStop(1, '#4A1525');
            ctx.fillStyle = sweaterGrad;

            ctx.beginPath();
            ctx.moveTo(x - 70, y + 150);
            ctx.quadraticCurveTo(x - 65, y + 30, x - 35, y + 20);
            ctx.lineTo(x + 35, y + 20);
            ctx.quadraticCurveTo(x + 65, y + 30, x + 70, y + 150);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#FDF2F4';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y + 22, 22, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x - 8, y + 40);
            ctx.lineTo(x - 8, y + 70);
            ctx.moveTo(x + 8, y + 40);
            ctx.lineTo(x + 8, y + 70);
            ctx.stroke();
            ctx.restore();
        }

        function drawArms(ctx, x, y, state, time) {
            ctx.save();
            ctx.fillStyle = '#8C2D42';
            ctx.strokeStyle = '#4A1525';
            ctx.lineWidth = 14;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // LEFT ARM
            ctx.beginPath();
            if (state.leftArmAngle > 0.5) {
                ctx.moveTo(x - 55, y + 40);
                ctx.quadraticCurveTo(x - 70, y - 10, x - 45, y - 50);
            } else {
                const typeOffset = Math.sin(time * 12) * 2;
                ctx.moveTo(x - 55, y + 40);
                ctx.quadraticCurveTo(x - 60, y + 100, x - 25, y + 120 + typeOffset);
            }
            ctx.stroke();

            // RIGHT ARM
            ctx.beginPath();
            if (state.rightArmAngle > 1.5) {
                ctx.moveTo(x + 55, y + 40);
                ctx.quadraticCurveTo(x + 85, y + 90, x + 70, y + 160);
            } else if (state.rightArmAngle > 0.5) {
                const wave = Math.sin(time * 10) * 20;
                ctx.moveTo(x + 55, y + 40);
                ctx.quadraticCurveTo(x + 80, y - 10, x + 75 + wave, y - 60);
            } else {
                const typeOffset = Math.cos(time * 12) * 2;
                ctx.moveTo(x + 55, y + 40);
                ctx.quadraticCurveTo(x + 60, y + 100, x + 25, y + 120 + typeOffset);
            }
            ctx.stroke();

            // Hands
            ctx.fillStyle = '#FFDFC4';
            ctx.beginPath();
            if (state.leftArmAngle > 0.5) {
                ctx.arc(x - 45, y - 50, 9, 0, Math.PI * 2);
            } else {
                ctx.arc(x - 25, y + 122, 8, 0, Math.PI * 2);
            }
            ctx.fill();

            ctx.beginPath();
            if (state.rightArmAngle > 1.5) {
                ctx.arc(x + 70, y + 160, 9, 0, Math.PI * 2);
                ctx.fillStyle = '#FFDFC4';
                ctx.fillRect(x + 68, y + 164, 4, 10);
            } else if (state.rightArmAngle > 0.5) {
                const wave = Math.sin(time * 10) * 20;
                ctx.arc(x + 75 + wave, y - 65, 10, 0, Math.PI * 2);
            } else {
                ctx.arc(x + 25, y + 122, 8, 0, Math.PI * 2);
            }
            ctx.fill();

            ctx.restore();
        }

        function drawLaptop(ctx, x, y, time) {
            ctx.save();
            ctx.fillStyle = '#CBD5E1';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x - 85, y + 10, 170, 14, 4);
            } else {
                ctx.rect(x - 85, y + 10, 170, 14);
            }
            ctx.fill();

            ctx.fillStyle = '#94A3B8';
            ctx.fillRect(x - 20, y + 18, 40, 4);

            ctx.fillStyle = '#94A3B8';
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x - 75, y - 90, 150, 100, [8, 8, 0, 0]);
            } else {
                ctx.rect(x - 75, y - 90, 150, 100);
            }
            ctx.fill();

            const screenGrad = ctx.createLinearGradient(x - 70, y - 85, x + 70, y - 5);
            screenGrad.addColorStop(0, '#0F172A');
            screenGrad.addColorStop(1, '#1E293B');
            ctx.fillStyle = screenGrad;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(x - 70, y - 85, 140, 90, 4);
            } else {
                ctx.rect(x - 70, y - 85, 140, 90);
            }
            ctx.fill();

            ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
            ctx.beginPath();
            ctx.arc(x, y - 40, 75, 0, Math.PI * 2);
            ctx.fill();

            const colors = ['#38BDF8', '#F472B6', '#4ADE80', '#FBBF24'];
            const lineOffset = (time * 15) % 12;
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = colors[i % colors.length];
                const lineWidth = 30 + ((i * 17) % 50);
                const lineY = y - 75 + i * 14 + (lineOffset > 6 ? 1 : 0);
                ctx.fillRect(x - 60, lineY, lineWidth, 4);
            }

            ctx.fillStyle = '#E2E8F0';
            ctx.beginPath();
            ctx.arc(x, y - 40, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        function drawHead(ctx, x, y, state, time) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(state.headAngle);

            // Neck connecting head to torso
            ctx.fillStyle = '#FFDFC4';
            ctx.fillRect(-12, 20, 24, 38);

            ctx.fillStyle = '#1A1A1A';
            ctx.beginPath();
            ctx.ellipse(0, 15, 52, 60, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFDFC4';
            ctx.beginPath();
            ctx.ellipse(0, 0, 36, 42, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(233, 30, 99, 0.18)';
            ctx.beginPath();
            ctx.arc(-20, 10, 8, 0, Math.PI * 2);
            ctx.arc(20, 10, 8, 0, Math.PI * 2);
            ctx.fill();

            const eyeLX = -14 + state.eyeOffsetX * 0.5;
            const eyeRX = 14 + state.eyeOffsetX * 0.5;
            const eyeY = -4 + state.eyeOffsetY * 0.8;

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(-14, -4, 7, 8, 0, 0, Math.PI * 2);
            ctx.ellipse(14, -4, 7, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#221510';
            ctx.beginPath();
            ctx.arc(eyeLX, eyeY, 4, 0, Math.PI * 2);
            ctx.arc(eyeRX, eyeY, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(eyeLX - 1, eyeY - 1, 1.5, 0, Math.PI * 2);
            ctx.arc(eyeRX - 1, eyeY - 1, 1.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#221510';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(-21, -16);
            ctx.quadraticCurveTo(-14, -20, -7, -16);
            ctx.moveTo(7, -16);
            ctx.quadraticCurveTo(14, -20, 21, -16);
            ctx.stroke();

            ctx.strokeStyle = 'rgba(140, 45, 66, 0.35)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -2);
            ctx.lineTo(-2, 6);
            ctx.lineTo(2, 6);
            ctx.stroke();

            ctx.fillStyle = '#C2415C';
            ctx.beginPath();
            if (state.mouthState === 'talk') {
                ctx.ellipse(0, 18, 6, 7, 0, 0, Math.PI * 2);
            } else {
                ctx.arc(0, 14, 10, 0.1 * Math.PI, 0.9 * Math.PI);
                ctx.quadraticCurveTo(0, 16, 0, 14);
            }
            ctx.fill();

            ctx.fillStyle = '#1A1A1A';
            ctx.beginPath();
            ctx.arc(0, -10, 40, Math.PI, 0);
            ctx.quadraticCurveTo(42, 20, 38, 50);
            ctx.lineTo(32, 50);
            ctx.quadraticCurveTo(34, 10, 20, -15);
            ctx.lineTo(-20, -15);
            ctx.quadraticCurveTo(-34, 10, -32, 50);
            ctx.lineTo(-38, 50);
            ctx.quadraticCurveTo(-42, 20, -40, -10);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        function drawHeadset(ctx, headX, headY, state) {
            ctx.save();
            const pos = state.headsetPosition;
            const hY = headY + pos * 55;
            const hX = headX + state.headOffsetX * (1 - pos);

            ctx.translate(hX, hY);
            ctx.rotate(state.headAngle * (1 - pos));

            ctx.strokeStyle = '#8C2D42';
            ctx.lineWidth = 6;
            ctx.beginPath();
            if (pos > 0.5) {
                ctx.arc(0, 25, 42, 0.1 * Math.PI, 0.9 * Math.PI);
            } else {
                ctx.arc(0, -18, 41, 0.85 * Math.PI, 0.15 * Math.PI, false);
            }
            ctx.stroke();

            ctx.fillStyle = '#4A1525';
            ctx.strokeStyle = '#FDF2F4';
            ctx.lineWidth = 2;

            const leftPadY = pos > 0.5 ? 40 : -2;
            const rightPadY = pos > 0.5 ? 40 : -2;

            ctx.beginPath();
            ctx.ellipse(-40, leftPadY, 9, 16, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(40, rightPadY, 9, 16, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = '#CBD5E1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-40, leftPadY + 5);
            ctx.quadraticCurveTo(-35, leftPadY + 25, -20, leftPadY + 20);
            ctx.stroke();

            ctx.fillStyle = '#E91E63';
            ctx.beginPath();
            ctx.arc(-20, leftPadY + 20, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        requestAnimationFrame(render);
    }

    initInteractiveHero();
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

// ==================== CERTIFICATE LIGHTBOX MODAL ====================
function openCertModal(imageSrc, captionText) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImage');
    const modalCap = document.getElementById('certModalCaption');
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        if (modalCap) modalCap.textContent = captionText || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});

// ==================== SCROLL PROGRESS INDICATOR ====================
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
        progressBar.style.width = `${currentProgress}%`;
    }
});

// ==================== NEURAL & CLOUD CANVAS BACKGROUND ====================
(function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const colors = ['#ff2a85', '#00f2fe', '#a855f7', '#38bdf8'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Interactive repulsion from mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 1.5;
                this.y -= Math.sin(angle) * 1.5;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateNeural() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.strokeStyle = `rgba(255, 42, 133, ${0.25 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNeural);
    }
    animateNeural();
})();

// ==================== INTERACTIVE CYBER TERMINAL CLI ====================
function runTerminalCmd(command) {
    const input = document.getElementById('terminalInput');
    if (input) {
        input.value = command;
        processTerminalInput(command);
    }
}

function processTerminalInput(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    const history = document.getElementById('terminalHistory');
    const input = document.getElementById('terminalInput');
    if (!history) return;

    if (input) input.value = '';

    if (cmd === 'clear') {
        history.innerHTML = '';
        playCyberSound('click');
        return;
    }

    // Add prompt line to history
    const userLine = document.createElement('div');
    userLine.className = 'terminal-output-line';
    userLine.innerHTML = `<span class="t-pink">farah@engineer</span>:<span class="t-cyan">~</span>$ ${escapeHtml(rawCmd)}`;
    history.appendChild(userLine);

    let outputHtml = '';

    switch (cmd) {
        case 'help':
            outputHtml = `
                <div class="t-pink">Available Commands:</div>
                <div class="t-cyan">  help        <span class="t-dim">- Display command list</span></div>
                <div class="t-cyan">  kep-status  <span class="t-dim">- Inspect Flagship KEP Cluster (Kubernetes, HashiCorp Vault, ELK, ArgoCD, AIOps)</span></div>
                <div class="t-cyan">  skills      <span class="t-dim">- Query Cloud, DevSecOps & AI technical stack</span></div>
                <div class="t-cyan">  certs       <span class="t-dim">- Inspect verified certifications & diplomas</span></div>
                <div class="t-cyan">  aws-status  <span class="t-dim">- Check live AWS Cloud & EKS cluster status</span></div>
                <div class="t-cyan">  ai-pipeline <span class="t-dim">- Trigger simulated PyTorch anomaly training</span></div>
                <div class="t-cyan">  cat bio.txt <span class="t-dim">- Read bio & double degree credentials</span></div>
                <div class="t-cyan">  clear       <span class="t-dim">- Clear terminal screen</span></div>
            `;
            break;

        case 'kep-status':
        case 'kep':
            outputHtml = `
                <div class="t-green">★ KEP (Kubernetes Enterprise Platform) STATUS: 100% ONLINE</div>
                <div class="t-dim">[VM 1: k8s-master] Control Plane + ArgoCD + Kubewatch + K8sGPT <span class="t-green">HEALTHY (192.168.233.188)</span></div>
                <div class="t-dim">[VM 2: k8s-worker] WokMaster Microservices + Vault Sidecar ... <span class="t-green">RUNNING (192.168.233.190)</span></div>
                <div class="t-dim">[VM 3: elk-vault]  Zero-Trust HashiCorp Vault & ELK Stack ..... <span class="t-green">UNSEALED & STREAMING</span></div>
                <div class="t-dim">[SECURITY] Falco Kernel Runtime Threat Monitoring ........... <span class="t-green">ACTIVE (0 Threats)</span></div>
                <div class="t-dim">[GITOPS] ArgoCD Server-Side Apply Sync ..................... <span class="t-green">SYNCED (0 Drift)</span></div>
                <div class="t-dim">[AIOps] Custom MCP Agent + K8sGPT Auto-Remediation ......... <span class="t-purple">AUTONOMOUS ACTIVE</span></div>
                <div class="t-yellow">Result: Capstone KEP Platform 100% Production-Ready.</div>
            `;
            break;

        case 'skills':
            outputHtml = `
                <div class="t-yellow">☁️ Cloud & Infrastructure:</div>
                <div class="t-dim">  • AWS (ECS, ECR, S3, IAM, CloudWatch) | Azure Cloud Architecture</div>
                <div class="t-dim">  • Kubernetes, Docker Containerization, Terraform IaC, Ansible</div>
                <div class="t-yellow">🛡️ DevSecOps & Security:</div>
                <div class="t-dim">  • GitHub Actions CI/CD, Trivy Vulnerability Audits, SonarQube, JWT Auth</div>
                <div class="t-yellow">🧠 AI & Machine Learning:</div>
                <div class="t-dim">  • PyTorch, Scikit-learn, DBSCAN Anomaly Detection, MLOps Pipelines</div>
            `;
            break;

        case 'certs':
            outputHtml = `
                <div class="t-pink">📜 Verified Accreditations & Diplomas:</div>
                <div>  • <span class="t-cyan">ELLA GenAI Security & Red Teaming</span> (Score: 10/10)</div>
                <div>  • <span class="t-cyan">ELLA Data Engineering & MLOps</span> (Score: 9.5/10)</div>
                <div>  • <span class="t-cyan">AWS Introduction to Containers</span> (Completion Cert)</div>
                <div>  • <span class="t-cyan">Cisco CCNA Switching, Routing & Wireless</span> (Verified)</div>
                <div>  • <span class="t-cyan">NVIDIA Fundamentals of Deep Learning</span> (Competency)</div>
                <div>  • <span class="t-cyan">NVIDIA AI for Anomaly Detection</span> (Competency)</div>
                <div>  • <span class="t-cyan">SAP Cloud ERP</span> (Record of Achievement)</div>
                <div>  • <span class="t-cyan">DELF B2 Diploma</span> (République Française)</div>
            `;
            break;

        case 'aws-status':
        case 'aws':
            outputHtml = `
                <div class="t-green">✔ AWS Cloud Infrastructure: ACTIVE</div>
                <div class="t-dim">[US-EAST-1] Multi-AZ EKS Cluster ..... <span class="t-green">100% HEALTHY</span></div>
                <div class="t-dim">[EU-WEST-1] Terraform Managed VPC ... <span class="t-green">100% HEALTHY</span></div>
                <div class="t-dim">[CONTAINERS] Docker Image ECR Registry <span class="t-cyan">0 VULNERABILITIES</span></div>
                <div class="t-yellow">Status: All Cloud Nodes Operational (Uptime: 99.99%)</div>
            `;
            break;

        case 'ai-pipeline':
        case 'ai':
            outputHtml = `
                <div class="t-purple">🤖 Executing AI Anomaly Detection Pipeline...</div>
                <div class="t-dim">[Step 1/3] Loading PyTorch Tensor Dataset... <span class="t-green">DONE</span></div>
                <div class="t-dim">[Step 2/3] Computing DBSCAN Feature Embeddings... <span class="t-green">DONE</span></div>
                <div class="t-dim">[Step 3/3] Evaluating Security Threats... <span class="t-green">ACCURACY: 98.7%</span></div>
                <div class="t-cyan">Result: Model Retrained & Deployed to MLOps Registry.</div>
            `;
            break;

        case 'cat bio.txt':
        case 'bio':
            outputHtml = `
                <div class="t-pink">👤 Farah Ben Chikha</div>
                <div class="t-dim">Cloud Computing Engineer Student @ ESPRIT (Tunisia)</div>
                <div class="t-dim">Double Degree Program @ Beijing Polytechnic University (China 🇹🇳🇨🇳)</div>
                <div class="t-yellow">Specialties: Cloud Architecture, DevSecOps Security, AI & MLOps</div>
                <div class="t-cyan">Contact: farah.benchikha@esprit.tn</div>
            `;
            break;

        default:
            outputHtml = `<div class="t-pink">Command not found: '${escapeHtml(cmd)}'. Type <span class="t-cyan">'help'</span> for list of commands.</div>`;
            break;
    }

    const resLine = document.createElement('div');
    resLine.className = 'terminal-output-line';
    resLine.innerHTML = outputHtml;
    history.appendChild(resLine);

    // Auto scroll terminal to bottom
    const termBody = document.getElementById('terminalBody');
    if (termBody) termBody.scrollTop = termBody.scrollHeight;

    playCyberSound('type');
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const termInput = document.getElementById('terminalInput');
    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                processTerminalInput(termInput.value);
            }
        });
    }

    // ==================== PROJECT CATEGORY FILTERS ====================
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            playCyberSound('click');
        });
    });

    // ==================== SOUND FX SYNTHESIZER ====================
    let soundEnabled = false;
    let audioCtx = null;

    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled && !audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (soundEnabled) {
                soundBtn.classList.add('active');
                soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span>FX ON</span>';
                playCyberSound('click');
            } else {
                soundBtn.classList.remove('active');
                soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span>FX OFF</span>';
            }
        });
    }

    window.playCyberSound = function(type) {
        if (!soundEnabled || !audioCtx) return;
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(800, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            } else if (type === 'type') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.04);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.04);
            }
        } catch (e) {
            console.error('Audio error:', e);
        }
    };
});