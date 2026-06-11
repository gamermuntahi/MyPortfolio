// ===== CINEMATIC INTRO - ANIMATION ORCHESTRATOR =====
// Timeline-driven sequence with camera shake, flash FX,
// parallax, mask reveals, and synchronized exit transitions

document.addEventListener('DOMContentLoaded', function () {
    const enterScreen = document.querySelector('.enter_screen');
    const cameraContainer = document.querySelector('.camera-container');
    const flashOverlay = document.querySelector('.flash-overlay');
    const vignetteOverlay = document.querySelector('.vignette-overlay');
    const stageLine = document.querySelector('.stage_line');
    const lineSweepEdge = document.querySelector('.line-sweep-edge');
    const imgsContainer = document.querySelector('.enter_screen_imgs');
    const charLeft = document.querySelector('.char-left');
    const charCenter = document.querySelector('.char-center');
    const charRight = document.querySelector('.char-right');
    const textContainer = document.querySelector('.enter-text-container');
    const letters = document.querySelectorAll('.enter-letter');
    const bgLayer1 = document.querySelector('.bg-layer-1');
    const bgLayer2 = document.querySelector('.bg-layer-2');
    const heroArea = document.querySelector('.heroArea');

    let isExiting = false;
    let parallaxActive = true;
    let introComplete = false;

    // ===== TIMELINE: Post-entrance FX triggers =====
    // These add dynamic effects at precise moments during the intro sequence

    // T=0.65s: Camera shake when line finishes sweeping in (impact feel)
    setTimeout(() => {
        if (!isExiting) {
            cameraContainer.classList.add('shake');
            // Remove shake class after animation completes
            setTimeout(() => cameraContainer.classList.remove('shake'), 250);
        }
    }, 650);

    // T=0.7s: Flash pulse on line impact
    setTimeout(() => {
        if (!isExiting) {
            flashOverlay.classList.add('pulse');
            setTimeout(() => flashOverlay.classList.remove('pulse'), 180);
        }
    }, 700);

    // T=0.85s: Z-index swap - characters emerge from behind line to in front
    // This is the key "reveal" moment where characters cross the line boundary
    setTimeout(() => {
        if (!isExiting) {
            imgsContainer.classList.add('revealed');
        }
    }, 850);

    // T=1.0s: Flash pulse on first sword impact
    setTimeout(() => {
        if (!isExiting) {
            flashOverlay.classList.add('pulse');
            setTimeout(() => flashOverlay.classList.remove('pulse'), 180);
        }
    }, 1000);

    // T=1.1s: Flash pulse on character impact
    setTimeout(() => {
        if (!isExiting) {
            flashOverlay.classList.add('pulse');
            setTimeout(() => flashOverlay.classList.remove('pulse'), 180);
        }
    }, 1100);

    // T=1.2s: Flash pulse on second sword impact
    setTimeout(() => {
        if (!isExiting) {
            flashOverlay.classList.add('pulse');
            setTimeout(() => flashOverlay.classList.remove('pulse'), 180);
        }
    }, 1200);

    // T=1.7s: Line settles into glow pulse (breathing effect)
    setTimeout(() => {
        if (!isExiting) {
            stageLine.classList.add('settled');
        }
    }, 1700);

    // T=2.0s: Text starts breathing animation (indicates clickability)
    setTimeout(() => {
        if (!isExiting) {
            textContainer.classList.add('breathing');
            introComplete = true;
        }
    }, 2000);

    // ===== PARALLAX: Mouse-driven depth movement =====
    // Background layers move slower (far), characters move faster (near)
    // Creates depth perception similar to camera dolly movement

    document.addEventListener('mousemove', function (e) {
        if (!parallaxActive || isExiting) return;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / centerX; // -1 to 1
        const moveY = (e.clientY - centerY) / centerY; // -1 to 1

        // Background layer 1: very subtle movement (far depth)
        if (bgLayer1) {
            bgLayer1.style.transform = `translate(${moveX * 3}px, ${moveY * 3}px)`;
        }

        // Background layer 2: slightly more movement (mid depth)
        if (bgLayer2) {
            bgLayer2.style.transform = `translate(${moveX * 6}px, ${moveY * 6}px)`;
        }

        // Characters: parallax movement (near depth)
        // Only apply after intro is complete to avoid conflicting with entrance animations
        if (introComplete) {
            if (charLeft) {
                charLeft.style.transform = `translate(${moveX * 10}px, ${moveY * 8}px) rotate(-5deg)`;
            }
            if (charCenter) {
                charCenter.style.transform = `translate(${moveX * 14}px, ${moveY * 12}px)`;
            }
            if (charRight) {
                charRight.style.transform = `translate(${moveX * 10}px, ${moveY * 8}px) rotate(5deg)`;
            }
        }
    });

    // Reset parallax on mouse leave
    document.addEventListener('mouseleave', function () {
        if (bgLayer1) bgLayer1.style.transform = '';
        if (bgLayer2) bgLayer2.style.transform = '';
        if (introComplete && !isExiting) {
            if (charLeft) charLeft.style.transform = '';
            if (charCenter) charCenter.style.transform = '';
            if (charRight) charRight.style.transform = '';
        }
    });

    // ===== EXIT SEQUENCE: Synchronized cinematic transition =====
    // All elements exit with motion blur, rotation, and clip-path contraction
    // Timed in rapid succession for energetic, professional feel

    function performCinematicExit() {
        if (isExiting) return;
        isExiting = true;
        parallaxActive = false;

        // Create AudioContext during user gesture for browser autoplay policy
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 64;
        const bgAudio = document.getElementById("bgAudio");
        const bgAudioSource = audioCtx.createMediaElementSource(bgAudio);
        bgAudioSource.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);

        // Stop text breathing
        textContainer.classList.remove('breathing');

        // Heavy camera shake on click (impact feel)
        cameraContainer.classList.add('shake-heavy');
        setTimeout(() => cameraContainer.classList.remove('shake-heavy'), 400);

        // Big flash on click
        flashOverlay.classList.add('big-flash');
        setTimeout(() => flashOverlay.classList.remove('big-flash'), 350);

        // T+50ms: Text container contracts tracking and fades
        setTimeout(() => {
            textContainer.classList.add('exit');
        }, 50);

        // T+80ms: Each letter flies up with blur
        setTimeout(() => {
            letters.forEach(letter => {
                letter.classList.add('exit');
                document.getElementById("enter-screen-title_").innerText = "Entering location";
            });
        }, 80);

        // T+150ms: Left sword exits left with rotation + motion blur
        setTimeout(() => {
            charLeft.classList.add('exit');
        }, 150);

        // T+180ms: Center character exits down with rotation + motion blur
        setTimeout(() => {
            charCenter.classList.add('exit');
        }, 180);

        // T+210ms: Right sword exits right with rotation + motion blur
        setTimeout(() => {
            charRight.classList.add('exit');
        }, 210);

        // T+280ms: Line sweep edge reverses
        setTimeout(() => {
            lineSweepEdge.classList.add('exit');
        }, 280);

        // T+300ms: Line contracts from both sides to center
        setTimeout(() => {
            stageLine.classList.add('exit');
        }, 300);

        // T+350ms: Vignette fades out
        setTimeout(() => {
            vignetteOverlay.style.transition = 'opacity 0.3s ease-out';
            vignetteOverlay.style.opacity = '0';
        }, 350);

        // T+400ms: Background layers fade
        setTimeout(() => {
            bgLayer1.style.transition = 'opacity 0.3s ease-out';
            bgLayer1.style.opacity = '0';
            bgLayer2.style.transition = 'opacity 0.3s ease-out';
            bgLayer2.style.opacity = '0';
        }, 400);

        // T+500ms: Screen exit - brightness flash + blur + scale up
        setTimeout(() => {
            enterScreen.classList.add('exit-active');
        }, 500);

        // T+1300ms: Show home content after exit animation completes
        setTimeout(() => {
            document.querySelector('.bg-video').style.display = 'none';
            document.getElementById('mainDiv').style.display = 'none';
            const homeContent = document.getElementById('homeContent');
            homeContent.classList.add('show');

            // Enable scrolling for home content
            document.body.style.overflow = 'auto';

            // Start audio and video
            audioCtx.resume();
            bgAudio.play();
            document.getElementById("bgVideo").play();

            // Volume control
            const vol = document.getElementById("vol");
            vol.addEventListener("input", e => {
                bgAudio.volume = e.target.value;
            });

            // Create equalizer bars
            const meterLeft = document.getElementById("meterLeft");
            const meterRight = document.getElementById("meterRight");
            const barsCount = 12;
            for (let i = 0; i < barsCount; i++) {
                let b1 = document.createElement("div");
                let b2 = document.createElement("div");
                b1.classList.add("bar");
                b2.classList.add("bar");
                meterLeft.appendChild(b1);
                meterRight.appendChild(b2);
            }

            const leftBars = meterLeft.querySelectorAll(".bar");
            const rightBars = meterRight.querySelectorAll(".bar");
            const freqData = new Uint8Array(analyserNode.frequencyBinCount);

            function animateMeters() {
                requestAnimationFrame(animateMeters);
                analyserNode.getByteFrequencyData(freqData);
                for (let i = 0; i < barsCount; i++) {
                    let index = Math.floor((i / barsCount) * freqData.length);
                    let value = freqData[index];
                    let height = Math.max(5, value * 0.6);
                    leftBars[i].style.height = height + "px";
                    rightBars[i].style.height = height + "px";
                }
            }

            animateMeters();

            // ===== Initialize portfolio features after intro exits =====
            initPortfolioFeatures(bgAudio);
        }, 1300);
    }

    // ===== EVENT HANDLERS =====

    // Click anywhere on enter screen to trigger exit
    enterScreen.addEventListener('click', function (e) {
        e.preventDefault();
        if (!isExiting && introComplete) {
            performCinematicExit();
        }
    });

    // Keyboard support (Enter key)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !isExiting && introComplete) {
            performCinematicExit();
        }
    });

    // Touch support
    enterScreen.addEventListener('touchend', function (e) {
        if (!isExiting && introComplete) {
            e.preventDefault();
            performCinematicExit();
        }
    });

    // Prevent text selection on enter screen
    enterScreen.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    // Responsive sizing is handled entirely by CSS @media queries
    // No JS resize handler needed - CSS handles all breakpoints
});

// ===== PORTFOLIO FEATURES - Initialized after cinematic intro =====
// Active nav, navbar scroll state, music volume, particles, skill bars, section reveals

function initPortfolioFeatures(bgAudio) {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('[data-section]');
    const heroSection = document.getElementById('heroArea');
    const particlesCanvas = document.getElementById('particlesCanvas');
    let originalVolume = bgAudio.volume;
    let isPastHero = false;

    // ===== PARTICLES ANIMATION =====
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        const particleCount = 60;
        const connectionDistance = 120;
        const particleSpeed = 0.4;

        function resizeCanvas() {
            particlesCanvas.width = window.innerWidth;
            particlesCanvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * particlesCanvas.width,
                y: Math.random() * particlesCanvas.height,
                vx: (Math.random() - 0.5) * particleSpeed,
                vy: (Math.random() - 0.5) * particleSpeed,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move particle
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = particlesCanvas.width;
                if (p.x > particlesCanvas.width) p.x = 0;
                if (p.y < 0) p.y = particlesCanvas.height;
                if (p.y > particlesCanvas.height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
                ctx.fill();

                // Draw connections to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const lineOpacity = (1 - dist / connectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        animateParticles();
    }

    // ===== SCROLL REVEAL - IntersectionObserver =====
    const scrollSections = document.querySelectorAll('.inner_part section:not(.about_sestion)');

    // Add scroll-reveal class to all sections except about (about has its own on-load animations)
    scrollSections.forEach(section => {
        section.classList.add('scroll-reveal');
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Staggered child reveals
                const children = entry.target.querySelectorAll(
                    '.project-card, .skill-card, .skill-area-card, .award-card, .contact-info-card, .contact-link-card'
                );
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 80);
                });

                // Skill bar fill animation
                const skillFills = entry.target.querySelectorAll('.skill-card-fill');
                skillFills.forEach((fill, index) => {
                    const level = fill.getAttribute('data-level');
                    setTimeout(() => {
                        fill.style.width = level + '%';
                        fill.classList.add('filled');
                    }, 300 + index * 100);
                });

                sectionObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===== ACTIVE NAV HIGHLIGHTING =====
    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('data-section');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // ===== NAVBAR SCROLL STATE & MUSIC VOLUME =====
    function updateNavbarState() {
        if (!heroSection) return;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > heroBottom - 100) {
            // Past hero section
            if (!isPastHero) {
                isPastHero = true;
                navbar.classList.add('scrolled');

                // Reduce music volume to 20%
                if (bgAudio && originalVolume > 0.2) {
                    bgAudio.volume = 0.2;
                    // Update volume slider if it exists
                    const volSlider = document.getElementById('vol');
                    if (volSlider) {
                        volSlider.value = 0.2;
                    }
                }
            }
        } else {
            // In hero section
            if (isPastHero) {
                isPastHero = false;
                navbar.classList.remove('scrolled');

                // Restore original music volume
                if (bgAudio) {
                    bgAudio.volume = originalVolume;
                    const volSlider = document.getElementById('vol');
                    if (volSlider) {
                        volSlider.value = originalVolume;
                    }
                }
            }
        }
    }

    // ===== SCROLL EVENT HANDLER =====
    // Throttled for performance
    let scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            updateNavbarState();
            scrollTimeout = null;
        }, 50);
    }, { passive: true });

    // Initial call
    updateActiveNav();
    updateNavbarState();

    // ===== NAV LINKS - Smooth scroll to sections =====
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
