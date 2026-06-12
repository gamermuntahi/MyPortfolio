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

            // Lenis handles scrolling — keep overflow hidden on html and body
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
    const threeCanvas = document.getElementById('threeCanvas');
    const mouseGlow = document.getElementById('mouseGlow');
    let originalVolume = bgAudio.volume;
    let isPastHero = false;
    let lenis = null;
    let threeScene = null, threeCamera = null, threeRenderer = null;
    let threeShapes = [];
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;

    

    // ===== THREE.JS 3D BACKGROUND SCENE =====
    if (threeCanvas && typeof THREE !== 'undefined') {
        threeScene = new THREE.Scene();

        threeCamera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        threeCamera.position.set(0, 0, 30);

        threeRenderer = new THREE.WebGLRenderer({
            canvas: threeCanvas,
            alpha: true,
            antialias: true
        });
        threeRenderer.setSize(window.innerWidth, window.innerHeight);
        threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Ambient + point lighting for depth
        threeScene.add(new THREE.AmbientLight(0x1a0a3e, 0.6));

        const pl1 = new THREE.PointLight(0xa855f7, 1.2, 50);
        pl1.position.set(10, 5, 10);
        threeScene.add(pl1);

        const pl2 = new THREE.PointLight(0x8b5cf6, 0.8, 40);
        pl2.position.set(-8, -3, 8);
        threeScene.add(pl2);

        const pl3 = new THREE.PointLight(0x6366f1, 0.6, 45);
        pl3.position.set(0, 8, -5);
        threeScene.add(pl3);

        // Material definitions
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xa855f7,
            metalness: 0.1,
            roughness: 0.4,
            transparent: true,
            opacity: 0.35,
            emissive: 0x2a0a4e,
            emissiveIntensity: 0.3,
            clearcoat: 0.1
        });

        const glassMat2 = new THREE.MeshPhysicalMaterial({
            color: 0x8b5cf6,
            metalness: 0.1,
            roughness: 0.35,
            transparent: true,
            opacity: 0.3,
            emissive: 0x1a0a3e,
            emissiveIntensity: 0.25,
            clearcoat: 0.1
        });

        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            wireframe: true,
            transparent: true,
            opacity: 0.08
        });

        // Helper: create and register a shape
        function createShape(geometry, material, pos, rotSpd, floatSpd, floatAmp) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(pos.x, pos.y, pos.z);
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            mesh.userData = {
                rotationSpeed: rotSpd,
                floatSpeed: floatSpd,
                floatAmp: floatAmp,
                baseY: pos.y,
                phase: Math.random() * Math.PI * 2
            };
            threeScene.add(mesh);
            threeShapes.push(mesh);
            return mesh;
        }

        // Floating geometric shapes
        createShape(
            new THREE.IcosahedronGeometry(2.5, 0), glassMat,
            { x: 9, y: 2, z: -5 }, { x: 0.002, y: 0.003, z: 0.001 }, 0.3, 1.5
        );
        createShape(
            new THREE.TorusKnotGeometry(1.8, 0.3, 100, 16), glassMat2,
            { x: -10, y: -1, z: -3 }, { x: 0.003, y: 0.002, z: 0.004 }, 0.25, 1.2
        );
        createShape(
            new THREE.OctahedronGeometry(1.6, 0), glassMat,
            { x: 7, y: 7, z: -8 }, { x: 0.001, y: 0.004, z: 0.002 }, 0.4, 2.0
        );
        createShape(
            new THREE.IcosahedronGeometry(1.2, 0), wireframeMat,
            { x: -8, y: 6, z: -6 }, { x: 0.002, y: 0.001, z: 0.003 }, 0.35, 1.8
        );
        createShape(
            new THREE.TorusGeometry(2.0, 0.2, 16, 50), glassMat2,
            { x: 2, y: -6, z: -4 }, { x: 0.001, y: 0.003, z: 0.002 }, 0.3, 1.0
        );
        createShape(
            new THREE.DodecahedronGeometry(1.0, 0), glassMat,
            { x: 12, y: -5, z: -7 }, { x: 0.004, y: 0.002, z: 0.003 }, 0.5, 1.3
        );
        createShape(
            new THREE.TorusKnotGeometry(1.5, 0.3, 64, 12), wireframeMat,
            { x: -3, y: -2, z: -12 }, { x: 0.001, y: 0.002, z: 0.001 }, 0.2, 0.8
        );

        // Floating particles (starfield dots)
        const particlesGeom = new THREE.BufferGeometry();
        const particlesCount = 200;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i]     = (Math.random() - 0.5) * 40;
            posArray[i + 1] = (Math.random() - 0.5) * 30;
            posArray[i + 2] = (Math.random() - 0.5) * 20 - 5;
        }
        particlesGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xa855f7,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        const particlesMesh = new THREE.Points(particlesGeom, particlesMat);
        particlesMesh.userData = {
            isParticles: true,
            rotationSpeed: { x: 0.0005, y: 0.0003, z: 0.0002 }
        };
        threeScene.add(particlesMesh);
        threeShapes.push(particlesMesh);

        // Mouse tracking for 3D scene reactiveness
        document.addEventListener('mousemove', function (e) {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        // Handle resize
        window.addEventListener('resize', function () {
            threeCamera.aspect = window.innerWidth / window.innerHeight;
            threeCamera.updateProjectionMatrix();
            threeRenderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // ===== MOUSE GLOW TRACKING =====
    if (mouseGlow) {
        document.addEventListener('mousemove', function (e) {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
            if (!mouseGlow.classList.contains('visible')) {
                mouseGlow.classList.add('visible');
            }
        }, { passive: true });

        document.addEventListener('mouseleave', function () {
            mouseGlow.classList.remove('visible');
        });
    }

    // ===== ACTIVE NAV & NAVBAR STATE (shared helpers) =====
    function updateActiveNavLenis(scrollPos) {
        let currentSection = '';
        const adjustedScroll = scrollPos + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (adjustedScroll >= sectionTop && adjustedScroll < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('data-section');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSection) {
                link.classList.add('active');
            }
        });
    }

    function updateNavbarStateLenis(scrollPos) {
        if (!heroSection) return;

        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;

        if (scrollPos > heroBottom - 100) {
            if (!isPastHero) {
                isPastHero = true;
                navbar.classList.add('scrolled');
                if (bgAudio && originalVolume > 0.2) {
                    bgAudio.volume = 0.2;
                    const volSlider = document.getElementById('vol');
                    if (volSlider) volSlider.value = 0.2;
                }
            }
        } else {
            if (isPastHero) {
                isPastHero = false;
                navbar.classList.remove('scrolled');
                if (bgAudio) {
                    bgAudio.volume = originalVolume;
                    const volSlider = document.getElementById('vol');
                    if (volSlider) volSlider.value = originalVolume;
                }
            }
        }
    }

    // ===== PARALLAX ON SCROLL =====
    const parallaxSections = document.querySelectorAll('.inner_part section');

    function updateParallax() {
        const scrollY = lenis ? (lenis.scroll || 0) : window.scrollY;

        parallaxSections.forEach(function (section) {
            const rect = section.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const offset = (centerY - viewportCenter) * 0.03;

            section.style.transform = 'translateY(' + offset + 'px)';
            section.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    }

    // ===== LENIS SMOOTH SCROLL =====
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
            smoothWheel: true,
            gestureOrientation: 'vertical',
            touchMultiplier: 2
        });

        lenis.on('scroll', function (e) {
            updateActiveNavLenis(e.scroll);
            updateNavbarStateLenis(e.scroll);
            updateParallax();
        });
    } else {
        // Fallback: native scroll with throttled handler
        let scrollTimeout;
        window.addEventListener('scroll', function () {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(function () {
                updateActiveNavLenis(window.scrollY);
                updateNavbarStateLenis(window.scrollY);
                updateParallax();
                scrollTimeout = null;
            }, 50);
        }, { passive: true });
    }

    // Initial calls
    updateActiveNavLenis(0);
    updateNavbarStateLenis(0);

    // ===== MAIN RAF LOOP (Three.js + Lenis) =====
    function mainRaf(time) {
        if (lenis) {
            lenis.raf(time);
        }

        // Three.js animation
        if (threeScene && threeRenderer) {
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            const scrollY = lenis ? (lenis.scroll || 0) : window.scrollY;
            const maxScroll = lenis ? (lenis.limit || document.body.scrollHeight - window.innerHeight) : (document.body.scrollHeight - window.innerHeight);
            const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

            // Animate each shape
            for (let i = 0; i < threeShapes.length; i++) {
                const shape = threeShapes[i];
                const ud = shape.userData;

                if (ud.isParticles) {
                    shape.rotation.y += ud.rotationSpeed.y;
                    shape.rotation.x += ud.rotationSpeed.x;
                } else {
                    const floatOffset = Math.sin(time * 0.001 * ud.floatSpeed + ud.phase) * ud.floatAmp;
                    shape.position.y = ud.baseY + floatOffset - scrollProgress * 8;

                    shape.rotation.x += ud.rotationSpeed.x;
                    shape.rotation.y += ud.rotationSpeed.y;
                    shape.rotation.z += ud.rotationSpeed.z;
                }
            }

            // Mouse-reactive camera
            threeCamera.position.x += (mouseX * 3 - threeCamera.position.x) * 0.02;
            threeCamera.position.y += (mouseY * 2 - threeCamera.position.y + scrollProgress * 2) * 0.02;
            threeCamera.lookAt(0, scrollProgress * 5, 0);

            threeRenderer.render(threeScene, threeCamera);
        }

        requestAnimationFrame(mainRaf);
    }

    requestAnimationFrame(mainRaf);

    // ===== PARTICLES CANVAS (preserved) =====
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
                ctx.fillStyle = 'rgba(168, 85, 247, ' + p.opacity + ')';
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
                        ctx.strokeStyle = 'rgba(168, 85, 247, ' + lineOpacity + ')';
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
    scrollSections.forEach(function (section) {
        section.classList.add('scroll-reveal');
    });

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Staggered child reveals
                const children = entry.target.querySelectorAll(
                    '.project-card, .skill-card, .skill-area-card, .award-card, .contact-info-card, .contact-link-card'
                );
                children.forEach(function (child, index) {
                    setTimeout(function () {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 80);
                });

                // Skill bar fill animation
                const skillFills = entry.target.querySelectorAll('.skill-card-fill');
                skillFills.forEach(function (fill, index) {
                    const level = fill.getAttribute('data-level');
                    setTimeout(function () {
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

    scrollSections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    // ===== NAV LINKS - Lenis smooth scroll =====
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                if (lenis) {
                    lenis.scrollTo(targetEl, {
                        offset: 0,
                        duration: 1.5,
                        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }
                    });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ===== CARD TILT EFFECT =====
    const tiltCards = document.querySelectorAll(
        '.project-card, .skill-card, .skill-area-card, .award-card, .contact-info-card, .contact-link-card'
    );

    tiltCards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = 'perspective(1200px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
            card.style.transition = 'transform 0.1s ease-out';

            // CSS custom properties for radial gradient mouse follow
            card.style.setProperty('--mouse-x', (x / rect.width) * 100 + '%');
            card.style.setProperty('--mouse-y', (y / rect.height) * 100 + '%');
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // ===== MAGNETIC BUTTONS (Nav Links) =====
    navLinks.forEach(function (link) {
        link.addEventListener('mousemove', function (e) {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 0.3;

            link.style.transform = 'translate(' + (x * strength) + 'px, ' + (y * strength) + 'px)';
            link.style.transition = 'transform 0.15s ease-out';
        });

        link.addEventListener('mouseleave', function () {
            link.style.transform = 'translate(0, 0)';
            link.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}
