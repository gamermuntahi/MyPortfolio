/**
 * Pure Vanilla Custom Cyber Mouse Cursor
 * Smooth lerp spring physics for dot & trailing ring on desktop devices.
 */

class CustomCursor {
  constructor() {
    this.dot = null;
    this.ring = null;

    this.mouseX = -100;
    this.mouseY = -100;
    this.ringX = -100;
    this.ringY = -100;

    this.animationFrameId = null;
  }

  init() {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) return;

    document.body.classList.add('has-custom-cursor');

    this.dot = document.getElementById('custom-cursor-dot');
    this.ring = document.getElementById('custom-cursor-ring');

    if (!this.dot || !this.ring) return;

    this.isLoopRunning = false;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      if (this.dot) {
        this.dot.style.transform = `translate3d(${this.mouseX}px, ${this.mouseY}px, 0)`;
      }

      if (!this.isLoopRunning) {
        this.isLoopRunning = true;
        this.startLoop();
      }
    }, { passive: true });

    this.bindHoverStates();
  }

  bindHoverStates() {
    const hoverElements = 'a, button, input, textarea, .glass-card, .magnetic, .filter-btn';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target && e.target.closest(hoverElements)) {
        if (this.ring) this.ring.classList.add('cursor-hover', 'hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target && e.target.closest(hoverElements)) {
        if (this.ring) this.ring.classList.remove('cursor-hover', 'hovering');
      }
    });

    document.addEventListener('mousedown', () => {
      if (this.ring) this.ring.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      if (this.ring) this.ring.classList.remove('clicking');
    });
  }

  startLoop() {
    const render = () => {
      const dx = this.mouseX - this.ringX;
      const dy = this.mouseY - this.ringY;

      // Snap and stop loop when close enough to save idle CPU usage
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        this.ringX = this.mouseX;
        this.ringY = this.mouseY;
        if (this.ring) {
          this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
        }
        this.isLoopRunning = false;
        this.animationFrameId = null;
        return;
      }

      this.ringX += dx * 0.15;
      this.ringY += dy * 0.15;

      if (this.ring) {
        this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
      }

      this.animationFrameId = requestAnimationFrame(render);
    };

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(render);
  }
}

window.customCursor = new CustomCursor();
