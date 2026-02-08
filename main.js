/* ============================================
   COGNITIVE LABS LLC — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll behavior ---
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile navigation toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link:not(.cta-link)');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinkElements.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- Scroll animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        // Stagger the animation
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, i * 100);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -60px 0px',
            }
        );

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    // --- Contact form handling (FormSubmit.co) ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnArrow = submitBtn.querySelector('.btn-arrow');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset states
        formSuccess.classList.remove('visible');
        formError.classList.remove('visible');

        // Show loading state
        btnText.style.display = 'none';
        btnArrow.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            formData.append('_captcha', 'false');
            formData.append('_subject', 'New inquiry from Cognitive Labs website');
            formData.append('_template', 'table');

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                contactForm.reset();
                formSuccess.classList.add('visible');

                setTimeout(() => {
                    formSuccess.classList.remove('visible');
                }, 8000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            formError.classList.add('visible');

            setTimeout(() => {
                formError.classList.remove('visible');
            }, 10000);
        } finally {
            btnText.style.display = 'inline';
            btnArrow.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
});
