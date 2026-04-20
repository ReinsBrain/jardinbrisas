document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CARGA MODULAR DE COMPONENTES
    const loadComponents = async () => {
        try {
            const navRes = await fetch('components/navbar.html');
            if(navRes.ok) document.getElementById('header-container').innerHTML = await navRes.text();
            
            const footRes = await fetch('components/footer.html');
            if(footRes.ok) document.getElementById('footer-container').innerHTML = await footRes.text();
            
            initNavbarLogic(); // Iniciar lógica del navbar una vez inyectado
        } catch (error) {
            console.error("Error cargando componentes.", error);
        }
    };

    // 2. LÓGICA DEL CARRUSEL (Hero Section restaurado)
    const initCarousel = () => {
        const slides = document.querySelectorAll('.hero__slide');
        const nextBtn = document.getElementById('next-slide');
        const prevBtn = document.getElementById('prev-slide');
        let currentSlide = 0;
        let slideInterval;

        if(slides.length === 0) return;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        nextBtn?.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn?.addEventListener('click', () => { prevSlide(); resetInterval(); });

        const startInterval = () => { slideInterval = setInterval(nextSlide, 5000); };
        const resetInterval = () => { clearInterval(slideInterval); startInterval(); };
        startInterval();
    };

    // 3. ANIMACIONES AL HACER SCROLL (Reveal)
    const initScrollAnimations = () => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        reveals.forEach(reveal => observer.observe(reveal));
    };

    // 4. PRELOADER
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 800);
        });
    };

    // 5. NUEVA LÓGICA: SMART NAVBAR, MODO OSCURO Y BACK TO TOP
    const initNavbarLogic = () => {
        // --- Smart Navbar ---
        let lastScroll = 0;
        const navbar = document.querySelector('.navbar');
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Smart Navbar
            if (currentScroll > 50) {
                navbar.classList.add('navbar--scrolled');
                if (currentScroll > lastScroll) {
                    navbar.classList.add('navbar--hidden'); // Ocultar al bajar
                } else {
                    navbar.classList.remove('navbar--hidden'); // Mostrar al subir
                }
            } else {
                navbar.classList.remove('navbar--scrolled', 'navbar--hidden');
            }
            lastScroll = currentScroll;

            // Back to Top Button Visibilidad
            if (currentScroll > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // --- Back to Top Click ---
        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // --- Modo Oscuro (Dark Mode) ---
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        // Verificar preferencia guardada
        if(localStorage.getItem('theme') === 'dark') {
            body.setAttribute('data-theme', 'dark');
            if(themeToggle) themeToggle.checked = true;
        }

        themeToggle?.addEventListener('change', () => {
            if (themeToggle.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    };

    // Ejecutar todo
    loadComponents();
    initCarousel();
    initScrollAnimations();
    initPreloader();
});