/**
 * Apple Style Product Page - Main JavaScript
 * Features: Scroll animations, navbar effects, color switching
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // Intersection Observer for scroll animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.tagline, .feature-card, .spec-item'
    );
    animatedElements.forEach(el => observer.observe(el));

    // ============================================
    // Navbar scroll effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for style changes
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.92)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // Color switcher for design section
    // ============================================
    const colorOptions = document.querySelectorAll('.color-option');
    const renderDevices = document.querySelectorAll('.render-device');

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            
            // Update active state on color options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Switch device render
            renderDevices.forEach(device => {
                device.classList.remove('active');
                if (device.classList.contains(color)) {
                    device.classList.add('active');
                }
            });
        });
    });

    // ============================================
    // Smooth scroll for anchor links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Parallax effect for hero visual
    // ============================================
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        if (heroVisual) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // ============================================
    // Feature card stagger animation delay
    // ============================================
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // ============================================
    // Spec items stagger animation delay
    // ============================================
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // ============================================
    // Magnetic hover effect for buttons (subtle)
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // ============================================
    // Prefers reduced motion check
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations for accessibility
        document.querySelectorAll('.chip-ring, .bar, .screen-glow, .lens-inner').forEach(el => {
            el.style.animation = 'none';
        });
    }
});
