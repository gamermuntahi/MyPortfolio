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

        // T+1300ms: Navigate to home.html after exit animation completes
        setTimeout(() => {
            window.location.href = 'home.html';
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
