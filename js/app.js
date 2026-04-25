document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CARGA MODULAR DE COMPONENTES
    const loadComponents = async () => {
        try {
            const navRes = await fetch('components/navbar.html');
            if(navRes.ok) document.getElementById('header-container').innerHTML = await navRes.text();
            
            const footRes = await fetch('components/footer.html');
            if(footRes.ok) document.getElementById('footer-container').innerHTML = await footRes.text();
            
            initGlobalLogic(); // Iniciar lógica global (Navbar, Tema, Menú) una vez inyectado el HTML
        } catch (error) {
            console.error("Error cargando componentes.", error);
        }
    };

    // 2. LÓGICA DEL CARRUSEL (Hero)
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
                if(preloader) preloader.style.opacity = '0';
                setTimeout(() => { if(preloader) preloader.style.display = 'none'; }, 500);
            }, 800);
        });
    };

    // 5. LÓGICAS GLOBALES UNIFICADAS (Navbar, Móvil, Tema, Flecha)
    const initGlobalLogic = () => {
        const body = document.body;
        
        // --- A. Smart Navbar & Back to Top ---
        let lastScroll = 0;
        const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const currentScroll = window.pageYOffset;
            
            // Smart Navbar
            if (navbar) {
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
            }
            lastScroll = currentScroll;

            // Back to Top Button
            if (backToTopBtn) {
                if (currentScroll > 400) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
        });

        // Click en Flecha
        backToTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // --- B. Menú Hamburguesa Móvil ---
        document.body.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('#mobile-menu');
            const navbarLinks = document.getElementById('navbar-links');
            
            if (toggleBtn && navbarLinks) {
                navbarLinks.classList.toggle('active');
                toggleBtn.classList.toggle('open');
            }
            
            // Cierra el menú al hacer clic en un link
            if (e.target.closest('.navbar__links a') && navbarLinks?.classList.contains('active')) {
                navbarLinks.classList.remove('active');
            }
        });

        // --- C. Modo Oscuro ---
        if(localStorage.getItem('theme') === 'dark') {
            body.setAttribute('data-theme', 'dark');
            setTimeout(() => {
                const iconS = document.getElementById('icon-sun');
                const iconM = document.getElementById('icon-moon');
                if(iconS && iconM) {
                    iconS.style.display = 'none';
                    iconM.style.display = 'block';
                    iconM.style.color = '#E8D8A6';
                }
            }, 500);
        }

        document.body.addEventListener('click', (e) => {
            const themeBtn = e.target.closest('#theme-toggle');
            if (!themeBtn) return;
            
            const iconSun = document.getElementById('icon-sun');
            const iconMoon = document.getElementById('icon-moon');
            
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if(iconSun && iconMoon) {
                    iconSun.style.display = 'block';
                    iconMoon.style.display = 'none';
                }
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if(iconSun && iconMoon) {
                    iconSun.style.display = 'none';
                    iconMoon.style.display = 'block';
                    iconMoon.style.color = '#E8D8A6';
                }
            }
        });
    };

    // Ejecutar inicio de la aplicación
    loadComponents();
    initCarousel();
    initScrollAnimations();
    initPreloader();
});