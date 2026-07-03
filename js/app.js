/**
 * Main Pure Vanilla JavaScript Application Controller
 * Orchestrates Lenis smooth scroll, GSAP ScrollTrigger parallax,
 * interactive 3D WebGL canvas engine, category filtering, and modal drawers.
 */

class PortfolioApp {
  constructor() {
    this.lenis = null;
    this.activeTestimonialIndex = 0;
    this.initPreloader();
  }

  initPreloader() {
    const bar = document.getElementById('preloader-bar');
    const percentEl = document.getElementById('preloader-percent');
    const preloader = document.getElementById('preloader');
    const statusEl = document.getElementById('preloader-status');
    const audioBtn = document.getElementById('preloader-audio-btn');

    // Enable mouse parallax tracking on preloader right away
    const preloaderLayers = document.querySelectorAll('#preloader [data-depth]');
    const preloaderMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mouseXRel = (e.clientX - windowWidth / 2);
      const mouseYRel = (e.clientY - windowHeight / 2);

      preloaderLayers.forEach((el) => {
        const depthAttr = el.getAttribute('data-depth');
        const depth = depthAttr ? parseFloat(depthAttr) : 0.4;
        const moveX = mouseXRel * depth * 0.05;
        const moveY = mouseYRel * depth * 0.05;

        if (typeof gsap !== 'undefined') {
          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
        }
      });
    };
    window.addEventListener('mousemove', preloaderMouseMove, { passive: true });

    // Enable audio from preloader audio button
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        if (window.audioManager) {
          window.audioManager.toggleAudio();
          audioBtn.innerHTML = '<span>🎶</span> <span>AUDIO PLAYING (OPEN-SOURCE)</span>';
          audioBtn.classList.add('border-[#00E5FF]', 'text-[#00E5FF]');
        }
      });
    }

    const statuses = [
      'STAGING 3D PARALLAX LAYERS...',
      'CONNECTING OPEN-SOURCE AMBIENT AUDIO...',
      'INITIALIZING DEFFIN AI ENGINE...',
      'GMS SYSTEM READY FOR EXPLORATION'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress > 100) progress = 100;

      if (bar) bar.style.width = `${progress}%`;
      if (percentEl) percentEl.innerText = `${progress}%`;

      if (statusEl) {
        if (progress > 80) statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-[#00E5FF] animate-ping"></span> <span>${statuses[3]}</span>`;
        else if (progress > 55) statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-[#7C3AED] animate-ping"></span> <span>${statuses[2]}</span>`;
        else if (progress > 25) statusEl.innerHTML = `<span class="inline-block w-2 h-2 rounded-full bg-[#00E5FF] animate-ping"></span> <span>${statuses[1]}</span>`;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.removeEventListener('mousemove', preloaderMouseMove);
          if (preloader) {
            if (typeof gsap !== 'undefined') {
              gsap.to('#preloader-card', {
                scale: 1.1,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
              });
              gsap.to(preloader, {
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                  preloader.style.pointerEvents = 'none';
                  preloader.style.display = 'none';
                  document.documentElement.classList.remove('overflow-hidden');
                  document.body.classList.remove('overflow-hidden', 'overflow-y-hidden');
                  this.bootstrapApp();
                }
              });
            } else {
              preloader.style.opacity = '0';
              preloader.style.pointerEvents = 'none';
              preloader.style.display = 'none';
              document.documentElement.classList.remove('overflow-hidden');
              document.body.classList.remove('overflow-hidden', 'overflow-y-hidden');
              this.bootstrapApp();
            }
          } else {
            this.bootstrapApp();
          }
        }, 300);
      }
    }, 90);
  }

  bootstrapApp() {
    // Setup Viewport Observer for Hero to disable off-screen ticking
    this.isHeroVisible = true;
    const heroSection = document.getElementById('hero');
    if (heroSection && typeof IntersectionObserver !== 'undefined') {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isHeroVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroSection);
    }

    // 1. Initialize Lenis Smooth Scroll
    this.initSmoothScroll();

    // 2. Initialize Video & WebGL Canvas Engine
    if (window.videoEngine) {
      window.videoEngine.init();
    }

    // 3. Initialize Custom Mouse Cursor
    if (window.customCursor) {
      window.customCursor.init();
    }

    // 4. Initialize Audio Manager
    if (window.audioManager) {
      window.audioManager.init('audio-visualizer-canvas');
    }

    // 5. Render Dynamic Sections from Data
    const data = window.PORTFOLIO_DATA;
    if (data) {
      this.renderProjects(data.projects);
      this.renderSkills();
      this.renderExperience();
      this.renderServices();
      this.renderTestimonials();
    }

    // 6. Setup GSAP ScrollTrigger Animations & Parallax
    this.setupScrollAnimations();

    // 7. Setup Mouse Spotlight on Glass Cards
    this.initCardSpotlightTracking();

    // 8. Setup Mouse Parallax & 3D Tilt Systems
    this.initParallaxAnd3DTilt();

    // 9. Setup Avatar Hologram Mode Switcher
    this.initAvatarModeSwitcher();

    // 10. Setup Active Navigation Link Scroll Highlighting
    this.initActiveNavTracking();

    // 11. Bind All UI Events
    this.bindEvents();

    // 12. Start Live Clock
    this.startLiveClock();

    // 11. Render Lucide Icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.0
      });

      const raf = (time) => {
        this.lenis.raf(time);
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.update();
        }
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          if (this.lenis) {
            this.lenis.scrollTo(href, { offset: -40 });
          } else {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  initCardSpotlightTracking() {
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.glass-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    }, { passive: true });
  }

  bindCardTilt(card) {
    let rect = null;
    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!rect) {
        rect = card.getBoundingClientRect();
      }
      const cardX = e.clientX - rect.left;
      const cardY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((cardY - centerY) / centerY) * 8;
      const rotY = ((cardX - centerX) / centerX) * 8;

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: rotX,
          rotateY: rotY,
          scale: 1.02,
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      } else {
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      rect = null;
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    }, { passive: true });
  }

  initParallaxAnd3DTilt() {
    const parallaxLayers = document.querySelectorAll('[data-depth], .parallax-layer');
    const avatarFrame = document.getElementById('avatar-hologram-frame');

    document.addEventListener('mousemove', (e) => {
      if (!this.isHeroVisible) return; // Optimize: skip tracking if hero is out of screen

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mouseXRel = (e.clientX - windowWidth / 2);
      const mouseYRel = (e.clientY - windowHeight / 2);

      // 1. Multi-Layer Parallax Elements Movement
      parallaxLayers.forEach((el) => {
        const depthAttr = el.getAttribute('data-depth');
        const depth = depthAttr ? parseFloat(depthAttr) : 0.4;
        const moveX = mouseXRel * depth * 0.04;
        const moveY = mouseYRel * depth * 0.04;

        if (typeof gsap !== 'undefined') {
          gsap.to(el, {
            x: moveX,
            y: moveY,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
        }
      });

      // 2. Hero Hologram Avatar Frame 3D Perspective Tilt
      if (avatarFrame) {
        const rotX = -mouseYRel * 0.02;
        const rotY = mouseXRel * 0.02;

        if (typeof gsap !== 'undefined') {
          gsap.to(avatarFrame, {
            rotateX: rotX,
            rotateY: rotY,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          avatarFrame.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        }
      }
    }, { passive: true });

    // 3. 3D Card Hover Tilt Effects (Bound to static non-project cards here)
    const staticCards = document.querySelectorAll('.glass-card:not(#projects-grid .glass-card), .glass-card-tilt:not(#projects-grid .glass-card-tilt)');
    staticCards.forEach((card) => this.bindCardTilt(card));
  }

  initAvatarModeSwitcher() {
    const portraitBtn = document.getElementById('mode-portrait-btn');
    const minecraftBtn = document.getElementById('mode-minecraft-btn');
    const avatarImg = document.getElementById('hero-avatar-img');
    const modeLabel = document.getElementById('avatar-mode-label');
    const avatarFrame = document.getElementById('avatar-hologram-frame');

    if (!portraitBtn || !minecraftBtn || !avatarImg) return;

    const switchMode = (mode) => {
      if (typeof gsap !== 'undefined' && avatarFrame) {
        gsap.to(avatarFrame, {
          scale: 0.9,
          opacity: 0.5,
          duration: 0.2,
          onComplete: () => {
            if (mode === 'portrait') {
              avatarImg.src = 'public/me.self.png';
              if (modeLabel) modeLabel.innerText = 'MUNTAHI • PRO PORTRAIT';
              portraitBtn.classList.add('mode-btn-active');
              portraitBtn.classList.remove('glass-pill', 'text-gray-400');
              minecraftBtn.classList.remove('mode-btn-active');
              minecraftBtn.classList.add('glass-pill', 'text-gray-400');
            } else {
              avatarImg.src = 'public/muntahi_minecraft.jpg';
              if (modeLabel) modeLabel.innerText = 'MUNTAHI • 3D GAME DEV';
              minecraftBtn.classList.add('mode-btn-active');
              minecraftBtn.classList.remove('glass-pill', 'text-gray-400');
              portraitBtn.classList.remove('mode-btn-active');
              portraitBtn.classList.add('glass-pill', 'text-gray-400');
            }

            gsap.to(avatarFrame, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'back.out(1.7)'
            });
          }
        });
      } else {
        if (mode === 'portrait') {
          avatarImg.src = '/muntahi_portrait.jpg';
          if (modeLabel) modeLabel.innerText = 'MUNTAHI • PRO PORTRAIT';
        } else {
          avatarImg.src = '/muntahi_minecraft.jpg';
          if (modeLabel) modeLabel.innerText = 'MUNTAHI • 3D GAME DEV';
        }
      }
    };

    portraitBtn.addEventListener('click', () => switchMode('portrait'));
    minecraftBtn.addEventListener('click', () => switchMode('minecraft'));
  }

  initActiveNavTracking() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'services', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) {
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${secId}`) {
                link.classList.add('active-nav');
              } else {
                link.classList.remove('active-nav');
              }
            });
          }
        }
      });
    });
  }

  renderProjects(projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projects.forEach((proj, index) => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/10 group hover:border-[#00E5FF]/40 transition-all duration-500 opacity-0 transform translate-y-8';
      
      card.innerHTML = `
        <div>
          <!-- Thumbnail Container -->
          <div class="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-black/40">
            <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
            <div class="absolute top-3 right-3 glass-pill px-3 py-1 rounded-full font-mono text-[10px] text-[#00E5FF] uppercase border border-[#00E5FF]/30">
              ${proj.category}
            </div>
          </div>

          <!-- Header & Info -->
          <div class="font-mono text-[11px] text-[#00E5FF] tracking-wider uppercase mb-1">${proj.subtitle}</div>
          <h3 class="font-display font-bold text-xl text-white mb-3 group-hover:text-[#00E5FF] transition-colors">${proj.title}</h3>
          <p class="text-gray-300 text-xs leading-relaxed mb-6">${proj.description}</p>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            ${proj.tags.map(t => `<span class="glass-pill px-2.5 py-1 rounded-md font-mono text-[10px] text-gray-300 border border-white/10">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs z-10 relative">
          <button data-case-study="${proj.id}" class="open-case-study-btn text-[#00E5FF] hover:underline flex items-center gap-1 font-semibold">
            <span>CASE STUDY</span>
            <span>↗</span>
          </button>
          <div class="flex items-center gap-3">
            <a href="${proj.githubUrl}" target="_blank" class="text-gray-400 hover:text-white transition-colors">CODE</a>
            <a href="${proj.liveUrl}" target="_blank" class="text-gray-400 hover:text-white transition-colors">LIVE</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
      this.bindCardTilt(card);

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.08,
          ease: 'power3.out'
        });
      } else {
        card.style.opacity = '1';
        card.style.transform = 'none';
      }
    });

    this.bindCaseStudyClickHandlers();
  }

  renderSkills() {
    const grid = document.getElementById('skills-grid');
    const categories = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.skills : [];
    if (!grid) return;

    grid.innerHTML = '';

    categories.forEach((cat) => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-8 border border-white/10';

      const skillsHTML = cat.skills.map(s => `
        <div class="mb-4">
          <div class="flex justify-between items-center mb-1 font-mono text-xs">
            <span class="text-gray-200 font-medium">${s.name}</span>
            <span class="text-[#00E5FF]">${s.tag}</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="skill-progress-bar h-full bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] w-0 transition-all duration-1000" data-level="${s.level}"></div>
          </div>
        </div>
      `).join('');

      card.innerHTML = `
        <h3 class="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
          <span class="text-[#00E5FF]">⚡</span>
          <span>${cat.title}</span>
        </h3>
        <div>${skillsHTML}</div>
      `;

      grid.appendChild(card);
      this.bindCardTilt(card);
    });
  }

  renderExperience() {
    const timeline = document.getElementById('timeline-container');
    const experience = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.experience : [];
    if (!timeline) return;

    timeline.innerHTML = '';

    experience.forEach((exp) => {
      const item = document.createElement('div');
      item.className = 'relative group';

      item.innerHTML = `
        <!-- Node Dot -->
        <div class="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#00E5FF] group-hover:scale-125 group-hover:bg-[#00E5FF] transition-all duration-300"></div>

        <div class="glass-card rounded-2xl p-6 border border-white/10">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <span class="font-mono text-xs text-[#00E5FF] font-semibold">${exp.period}</span>
              <h3 class="font-display font-bold text-xl text-white">${exp.role}</h3>
              <div class="text-gray-400 text-xs font-mono">${exp.company} • ${exp.location}</div>
            </div>
          </div>

          <p class="text-gray-300 text-xs leading-relaxed mb-4">${exp.description}</p>

          <ul class="space-y-1.5 mb-4 text-xs text-gray-400 list-disc list-inside">
            ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
          </ul>

          <div class="flex flex-wrap gap-2">
            ${exp.tech.map(t => `<span class="glass-pill px-2 py-0.5 rounded font-mono text-[10px] text-gray-300 border border-white/10">${t}</span>`).join('')}
          </div>
        </div>
      `;

        timeline.appendChild(item);
        const expCard = item.querySelector('.glass-card');
        if (expCard) this.bindCardTilt(expCard);
      });
  }

  renderServices() {
    const grid = document.getElementById('services-grid');
    const services = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.services : [];
    if (!grid) return;

    grid.innerHTML = '';

    services.forEach((srv) => {
      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-8 border border-white/10 flex flex-col justify-between group hover:border-[#00E5FF]/40 transition-all';

      card.innerHTML = `
        <div>
          <div class="font-mono text-xs text-[#00E5FF] mb-2 uppercase">// SERVICE MODULE</div>
          <h3 class="font-display font-bold text-2xl text-white mb-2">${srv.title}</h3>
          <div class="text-gray-400 font-mono text-xs mb-4">${srv.tagline}</div>
          <p class="text-gray-300 text-xs leading-relaxed mb-6">${srv.description}</p>

          <ul class="space-y-2 mb-8 font-mono text-xs text-gray-300">
            ${srv.features.map(f => `
              <li class="flex items-center gap-2">
                <span class="text-[#00E5FF]">✓</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <a href="#contact" class="magnetic w-full py-3 rounded-xl glass-pill text-center font-display font-semibold text-xs text-white hover:border-[#00E5FF] transition-all z-10 relative">
          INQUIRE NOW
        </a>
      `;

      grid.appendChild(card);
      this.bindCardTilt(card);
    });
  }

  renderTestimonials() {
    const content = document.getElementById('testimonial-content');
    const dotsContainer = document.getElementById('testimonial-dots');
    const testimonials = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.testimonials : [];
    if (!content || testimonials.length === 0) return;

    const current = testimonials[this.activeTestimonialIndex];

    content.innerHTML = `
      <div class="flex justify-center mb-4 text-[#00E5FF] text-lg">
        ${'★'.repeat(current.stars)}
      </div>
      <blockquote class="font-display text-lg sm:text-xl text-gray-200 italic mb-8 leading-relaxed max-w-2xl mx-auto">
        "${current.text}"
      </blockquote>
      <div class="flex items-center justify-center gap-4">
        <img src="${current.avatar}" alt="${current.name}" class="w-12 h-12 rounded-full object-cover border-2 border-[#00E5FF]" />
        <div class="text-left">
          <div class="font-display font-bold text-white text-sm">${current.name}</div>
          <div class="font-mono text-xs text-gray-400">${current.role} • ${current.company}</div>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = testimonials.map((_, i) => `
        <button data-testimonial-dot="${i}" class="w-2.5 h-2.5 rounded-full ${i === this.activeTestimonialIndex ? 'bg-[#00E5FF]' : 'bg-white/20'} transition-all"></button>
      `).join('');

      dotsContainer.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-testimonial-dot') || '0', 10);
          this.activeTestimonialIndex = idx;
          this.renderTestimonials();
        });
      });
    }
  }

  setupScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Reveal Title in Hero
    gsap.from('.hero-letter', {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.04,
      duration: 1.0,
      ease: 'back.out(1.7)'
    });

    gsap.from('#hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6
    });

    // 2. Section Title Reveal Animations
    gsap.utils.toArray('section h2').forEach((h2) => {
      gsap.from(h2, {
        scrollTrigger: {
          trigger: h2,
          start: 'top 85%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // 3. Parallax shifts for depth
    gsap.to('#about', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -20
    });

    gsap.to('#projects', {
      scrollTrigger: {
        trigger: '#projects',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: -30
    });

    // Scrolling Parallax for About Showcase Cards
    gsap.to('#about-showcase-1', {
      scrollTrigger: {
        trigger: '#about-showcase-1',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -40,
      ease: 'none'
    });

    gsap.to('#about-showcase-2', {
      scrollTrigger: {
        trigger: '#about-showcase-2',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -15,
      ease: 'none'
    });

    // Scrolling Parallax for Hero Badges
    gsap.to('#hero-parallax-badge-1', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: -120,
      ease: 'none'
    });

    gsap.to('#hero-parallax-badge-2', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 90,
      ease: 'none'
    });

    gsap.to('#hero-parallax-badge-3', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: -160,
      ease: 'none'
    });

    gsap.to('#hero-parallax-badge-4', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 110,
      ease: 'none'
    });

    // 4. Animate Skill Progress Bars
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 70%',
      onEnter: () => {
        document.querySelectorAll('.skill-progress-bar').forEach((bar) => {
          const level = bar.getAttribute('data-level');
          if (level) bar.style.width = `${level}%`;
        });
      }
    });

    // 5. Count-Up Numbers
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 70%',
      onEnter: () => {
        document.querySelectorAll('.count-up').forEach((el) => {
          const originalText = el.getAttribute('data-original-text') || el.innerText;
          el.setAttribute('data-original-text', originalText);

          const match = originalText.match(/^(\d+)(.*)$/);
          if (!match) return;

          const target = parseInt(match[1], 10);
          const suffix = match[2];
          let count = 0;
          const duration = 1500;
          const step = Math.max(1, Math.ceil(target / (duration / 16)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.innerText = `${count}${suffix}`;
          }, 16);
        });
      }
    });
  }

  bindEvents() {
    // Project Category Filtering
    const filterButtons = document.querySelectorAll('#project-filters button');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('border-[#00E5FF]', 'text-[#00E5FF]');
          b.classList.add('border-white/10', 'text-gray-400');
        });
        btn.classList.remove('border-white/10', 'text-gray-400');
        btn.classList.add('border-[#00E5FF]', 'text-[#00E5FF]');

        const cat = btn.getAttribute('data-filter');
        const projects = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.projects : [];
        if (cat === 'all') {
          this.renderProjects(projects);
        } else {
          this.renderProjects(projects.filter(p => p.category === cat));
        }
      });
    });

    // Testimonials Navigation Controls
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const testimonials = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.testimonials : [];

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.activeTestimonialIndex = (this.activeTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        this.renderTestimonials();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.activeTestimonialIndex = (this.activeTestimonialIndex + 1) % testimonials.length;
        this.renderTestimonials();
      });
    }

    // Copy Email to Clipboard
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const emailStr = document.getElementById('contact-email-str')?.innerText || 'smmuntahi@gmail.com';
        navigator.clipboard.writeText(emailStr).then(() => {
          copyBtn.innerText = 'COPIED! ✓';
          setTimeout(() => copyBtn.innerText = 'COPY 📋', 2000);
        });
      });
    }

    // Contact Form Submission Simulator
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('contact-submit-btn');
        if (btn) {
          btn.disabled = true;
          btn.innerText = 'TRANSMITTING MESSAGE... ⚡';

          setTimeout(() => {
            btn.innerText = 'MESSAGE TRANSMITTED SUCCESSFULLY! ✓';
            btn.classList.remove('from-[#00E5FF]', 'to-[#7C3AED]');
            btn.classList.add('bg-green-500', 'text-black');
            form.reset();

            setTimeout(() => {
              btn.disabled = false;
              btn.innerText = 'SEND MESSAGE ⚡';
              btn.classList.add('from-[#00E5FF]', 'to-[#7C3AED]');
              btn.classList.remove('bg-green-500');
            }, 3000);
          }, 1200);
        }
      });
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.remove('opacity-0', 'pointer-events-none');
        mobileDrawer.classList.add('opacity-100');
        if (this.lenis) this.lenis.stop();
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('overflow-hidden');
      });
    }

    if (mobileClose && mobileDrawer) {
      const closeMobileDrawer = () => {
        mobileDrawer.classList.add('opacity-0', 'pointer-events-none');
        mobileDrawer.classList.remove('opacity-100');
        if (this.lenis) this.lenis.start();
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
      };

      mobileClose.addEventListener('click', closeMobileDrawer);
      mobileNavItems.forEach((item) => {
        item.addEventListener('click', closeMobileDrawer);
      });
    }

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top-btn');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        if (this.lenis) {
          this.lenis.scrollTo('#hero');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    // Scroll Progress Indicator Line
    window.addEventListener('scroll', () => {
      const scrollBar = document.getElementById('scroll-progress-bar');
      if (scrollBar) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollBar.style.width = `${progress}%`;
      }
    }, { passive: true });

    // Modal Close Button
    const modalClose = document.getElementById('modal-close-btn');
    const modal = document.getElementById('case-study-modal');
    if (modal && modalClose) {
      const closeModal = () => {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
        if (this.lenis) this.lenis.start();
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
      };

      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  bindCaseStudyClickHandlers() {
    const btns = document.querySelectorAll('.open-case-study-btn');
    const modal = document.getElementById('case-study-modal');
    const body = document.getElementById('modal-content-body');
    const projects = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.projects : [];

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-case-study');
        const proj = projects.find(p => p.id === projId);

        if (proj && modal && body) {
          const cs = proj.caseStudy;
          body.innerHTML = `
            <div class="font-mono text-xs text-[#00E5FF] tracking-widest uppercase mb-2">// ARCHITECTURAL CASE STUDY</div>
            <h2 class="font-display font-bold text-3xl text-white mb-2">${proj.title}</h2>
            <div class="font-mono text-xs text-gray-400 mb-6">${proj.subtitle}</div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 glass-pill p-4 rounded-xl border border-white/10 font-mono text-xs">
              <div>
                <div class="text-gray-500 text-[10px]">CLIENT</div>
                <div class="text-white font-semibold">${cs.client}</div>
              </div>
              <div>
                <div class="text-gray-500 text-[10px]">ROLE</div>
                <div class="text-white font-semibold">${cs.role}</div>
              </div>
              <div>
                <div class="text-gray-500 text-[10px]">TIMELINE</div>
                <div class="text-white font-semibold">${cs.timeline}</div>
              </div>
            </div>

            <h3 class="font-display font-bold text-lg text-white mb-2">Project Overview</h3>
            <p class="text-gray-300 text-xs leading-relaxed mb-6">${cs.overview}</p>

            <h3 class="font-display font-bold text-lg text-white mb-2">Key Technical Architecture</h3>
            <ul class="space-y-2 mb-6 font-mono text-xs text-gray-300 list-disc list-inside">
              ${cs.architecture.map(arch => `<li>${arch}</li>`).join('')}
            </ul>

            ${cs.codeSnippet ? `
              <h3 class="font-display font-bold text-lg text-white mb-2">Core Code Implementation</h3>
              <pre class="glass-pill p-4 rounded-xl font-mono text-xs text-[#00E5FF] overflow-x-auto mb-6 leading-relaxed">
${cs.codeSnippet}
              </pre>
            ` : ''}

            <div class="glass-card p-4 rounded-xl border border-[#00E5FF]/30 font-mono text-xs mb-8">
              <div class="text-[#00E5FF] font-semibold mb-1">BUSINESS & TECHNICAL IMPACT</div>
              <div class="text-gray-300">${cs.impact}</div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-white/10 font-mono text-xs">
              <a href="${proj.liveUrl}" target="_blank" class="px-6 py-2.5 rounded-full bg-[#00E5FF] text-black font-semibold hover:shadow-[0_0_15px_#00E5FF]">
                LAUNCH LIVE EXPERIENCE ↗
              </a>
              <a href="${proj.githubUrl}" target="_blank" class="text-gray-400 hover:text-white">
                VIEW REPOSITORY
              </a>
            </div>
          `;

          modal.classList.remove('opacity-0', 'pointer-events-none');
          modal.classList.add('opacity-100');

          if (this.lenis) this.lenis.stop();
          document.documentElement.classList.add('overflow-hidden');
          document.body.classList.add('overflow-hidden');
        }
      });
    });
  }

  startLiveClock() {
    const clockWidget = document.getElementById('live-clock-widget');
    if (!clockWidget) return;

    const update = () => {
      const now = new Date();
      const utc = now.toUTCString().split(' ')[4];
      clockWidget.innerText = `GMS HQ • ${utc} UTC`;
    };

    update();
    setInterval(update, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
