/**
 * Three.js Powered Pure Vanilla Video Layer & 3D Interactive WebGL Canvas Engine
 * Handles Layer 1 (Fullscreen Background Video / WebGL 3D Particle Mesh)
 * & Layer 2 (Foreground Person Video / 3D Holographic WebGL Avatar)
 * Optimized for performance with lerp physics, tab visibility checks, and 60 FPS rendering.
 */

class VideoEngine {
  constructor() {
    // Layer 1 Background Elements & Three.js State
    this.bgVideoEl = null;
    this.bgCanvas = null;
    this.bgRenderer = null;
    this.bgScene = null;
    this.bgCamera = null;
    this.bgMainMesh = null;
    this.bgParticles = null;
    this.bgPointLight1 = null;
    this.bgPointLight2 = null;

    // Layer 2 Person Elements & Three.js State
    this.personVideoEl = null;
    this.personCanvas = null;
    this.personRenderer = null;
    this.personScene = null;
    this.personCamera = null;
    this.personAvatarGroup = null;
    this.personScannerRing = null;

    // Flags
    this.isBgVideoLoaded = false;
    this.isPersonVideoLoaded = false;
    this.isTabVisible = true;

    // Mouse & Scroll Parallax Physics
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollY = 0;
    this.isHeroVisible = true;

    this.animationFrameId = null;
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js CDN not loaded yet, retrying...');
      setTimeout(() => this.init(), 100);
      return;
    }

    this.setupTrackingAndVisibility();
    this.initBackgroundLayer();
    this.initPersonLayer();
    this.startRenderLoop();
  }

  setupTrackingAndVisibility() {
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      this.isTabVisible = !document.hidden;
    });

    // Viewport-based rendering using IntersectionObserver
    const heroSection = document.getElementById('hero');
    if (heroSection && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isHeroVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }
  }

  // =========================================================================
  // LAYER 1: Fullscreen Background Video & Three.js 3D WebGL Fallback Scene
  // =========================================================================
  initBackgroundLayer() {
    this.bgVideoEl = document.getElementById('hero-bg-video');
    this.bgCanvas = document.getElementById('hero-bg-canvas');

    if (!this.bgCanvas) return;

    // 1. Setup Three.js WebGL Renderer
    this.bgRenderer = new THREE.WebGLRenderer({
      canvas: this.bgCanvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    this.bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Performance cap

    // 2. Setup Camera & Scene
    this.bgScene = new THREE.Scene();
    this.bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.bgCamera.position.z = 25;

    // 3. Create Central Interactive 3D Wireframe Geometry
    this.bgMainMesh = new THREE.Group();

    // Outer Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(8, 2);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.2
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    this.bgMainMesh.add(icoMesh);

    // Inner Core TorusKnot
    const knotGeo = new THREE.TorusKnotGeometry(4, 1.2, 100, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.3
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    this.bgMainMesh.add(knotMesh);

    this.bgScene.add(this.bgMainMesh);

    // 4. Create 3D Particle Cloud Field
    const particleCount = 1000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00e5ff);
    const purpleColor = new THREE.Color(0x7c3aed);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const mixedColor = Math.random() > 0.5 ? cyanColor : purpleColor;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    this.bgParticles = new THREE.Points(particleGeo, particleMat);
    this.bgScene.add(this.bgParticles);

    // 5. Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.bgScene.add(ambientLight);

    this.bgPointLight1 = new THREE.PointLight(0x00e5ff, 4, 60);
    this.bgPointLight1.position.set(15, 15, 15);
    this.bgScene.add(this.bgPointLight1);

    this.bgPointLight2 = new THREE.PointLight(0x7c3aed, 4, 60);
    this.bgPointLight2.position.set(-15, -15, 10);
    this.bgScene.add(this.bgPointLight2);

    // Window Resize Handler
    window.addEventListener('resize', () => {
      if (!this.bgRenderer || !this.bgCamera) return;
      this.bgCamera.aspect = window.innerWidth / window.innerHeight;
      this.bgCamera.updateProjectionMatrix();
      this.bgRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Handle Background Video Playback
    if (this.bgVideoEl) {
      this.bgVideoEl.style.transition = 'opacity 1.5s ease-in-out';
      const playPromise = this.bgVideoEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isBgVideoLoaded = true;
          this.bgVideoEl.style.opacity = '0.35';
        }).catch(() => {
          this.isBgVideoLoaded = false;
          this.bgVideoEl.style.opacity = '0';
        });
      }
    }
  }

  // =========================================================================
  // LAYER 2: Foreground Person / 3D Hologram Avatar Layer
  // =========================================================================
  initPersonLayer() {
    this.personVideoEl = document.getElementById('hero-person-video');
    this.personCanvas = document.getElementById('hero-person-canvas');

    if (!this.personCanvas) return;

    // 1. Setup Three.js WebGL Renderer for Avatar Stage
    const w = 500;
    const h = 600;
    this.personRenderer = new THREE.WebGLRenderer({
      canvas: this.personCanvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.personRenderer.setSize(w, h);
    this.personRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 2. Setup Camera & Scene
    this.personScene = new THREE.Scene();
    this.personCamera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    this.personCamera.position.z = 12;

    // 3. Create 3D Holographic Cybernetic Avatar Group
    this.personAvatarGroup = new THREE.Group();

    // Core Wireframe Sphere Head
    const headGeo = new THREE.IcosahedronGeometry(2, 2);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      wireframe: true,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 1.2;
    this.personAvatarGroup.add(headMesh);

    // Torus Ring Orbit (Shoulders/Body Aura)
    const bodyGeo = new THREE.TorusGeometry(3.5, 0.2, 16, 100);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      wireframe: true,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.75
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.rotation.x = Math.PI / 2.5;
    bodyMesh.position.y = -1.5;
    this.personAvatarGroup.add(bodyMesh);

    // Horizontal Scanning Hologram Ring
    const scannerGeo = new THREE.RingGeometry(3.8, 4.0, 64);
    const scannerMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    this.personScannerRing = new THREE.Mesh(scannerGeo, scannerMat);
    this.personScannerRing.rotation.x = Math.PI / 2;
    this.personAvatarGroup.add(this.personScannerRing);

    this.personScene.add(this.personAvatarGroup);

    // 4. Add Lights
    const light1 = new THREE.PointLight(0x00e5ff, 5, 20);
    light1.position.set(5, 5, 5);
    this.personScene.add(light1);

    const light2 = new THREE.PointLight(0x7c3aed, 5, 20);
    light2.position.set(-5, -5, 5);
    this.personScene.add(light2);

    // GSAP Floating Levitation Effect
    const personContainer = document.getElementById('hero-person-layer');
    if (personContainer && window.gsap) {
      window.gsap.to(personContainer, {
        y: -16,
        rotateZ: 1.2,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

    // Handle Person Video Playback
    if (this.personVideoEl) {
      this.personVideoEl.style.transition = 'opacity 1.2s ease-in-out';
      const playPromise = this.personVideoEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.isPersonVideoLoaded = true;
          this.personVideoEl.classList.remove('hidden');
          this.personVideoEl.style.opacity = '0.9';
          if (this.personCanvas) this.personCanvas.style.opacity = '0.3';
        }).catch(() => {
          this.isPersonVideoLoaded = false;
          if (this.personCanvas) this.personCanvas.style.opacity = '1';
        });
      }
    }
  }

  // =========================================================================
  // Main WebGL Render Loop (60 FPS with lerp interpolation & tab awareness)
  // =========================================================================
  startRenderLoop() {
    const clock = new THREE.Clock();

    const render = () => {
      this.animationFrameId = requestAnimationFrame(render);

      // Skip rendering if tab is inactive OR hero is off-screen to save GPU/battery
      if (!this.isTabVisible || !this.isHeroVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      // 1. Render Background WebGL Scene
      if (this.bgScene && this.bgCamera && this.bgRenderer) {
        if (this.bgMainMesh) {
          this.bgMainMesh.rotation.x = elapsedTime * 0.15 + this.mouseY * 0.3;
          this.bgMainMesh.rotation.y = elapsedTime * 0.2 + this.mouseX * 0.4;
          this.bgMainMesh.position.y = -this.scrollY * 0.005;
        }

        if (this.bgParticles) {
          this.bgParticles.rotation.y = elapsedTime * 0.05 + this.mouseX * 0.2;
          this.bgParticles.rotation.x = this.mouseY * 0.1;
        }

        if (this.bgPointLight1 && this.bgPointLight2) {
          this.bgPointLight1.position.x = Math.sin(elapsedTime * 0.8) * 20;
          this.bgPointLight1.position.z = Math.cos(elapsedTime * 0.8) * 20;

          this.bgPointLight2.position.x = Math.cos(elapsedTime * 0.6) * -20;
          this.bgPointLight2.position.z = Math.sin(elapsedTime * 0.6) * 20;
        }

        this.bgCamera.position.x = this.mouseX * 3;
        this.bgCamera.position.y = -this.mouseY * 2;
        this.bgCamera.lookAt(0, 0, 0);

        this.bgRenderer.render(this.bgScene, this.bgCamera);
      }

      // 2. Render Person 3D Hologram WebGL Scene
      if (this.personScene && this.personCamera && this.personRenderer) {
        if (this.personAvatarGroup) {
          this.personAvatarGroup.rotation.y = elapsedTime * 0.5 + this.mouseX * 0.5;
          this.personAvatarGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2 + this.mouseY * 0.3;
        }

        if (this.personScannerRing) {
          this.personScannerRing.position.y = Math.sin(elapsedTime * 2.5) * 2.5;
        }

        this.personRenderer.render(this.personScene, this.personCamera);
      }
    };

    render();
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.bgRenderer) this.bgRenderer.dispose();
    if (this.personRenderer) this.personRenderer.dispose();
  }
}

window.videoEngine = new VideoEngine();
