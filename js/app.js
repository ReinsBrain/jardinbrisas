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



    // --- LÓGICA DE LA FLECHA HACIA ARRIBA ---
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- LÓGICA DEL MODO OSCURO ---
    // Usamos delegación de eventos porque el navbar carga de forma asíncrona
    document.body.addEventListener('click', (e) => {
        const themeBtn = e.target.closest('#theme-toggle');
        if (!themeBtn) return; // Si no hizo clic en el botón, ignora
        
        const body = document.body;
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            iconSun.style.display = 'block';
            iconMoon.style.display = 'none';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'block';
            iconMoon.style.color = '#E8D8A6'; // Ajuste de color del icono en modo oscuro
        }
    });

    // Revisar memoria al cargar la página
    if(localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        // Pequeño delay para asegurar que el navbar ya se inyectó antes de cambiar el icono
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


    // --- MOTOR DEL SMART NAVBAR ---
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('navbar--scrolled');
            // Si baja, oculta. Si sube, muestra.
            if (currentScroll > lastScroll) {
                navbar.classList.add('navbar--hidden'); 
            } else {
                navbar.classList.remove('navbar--hidden'); 
            }
        } else {
            navbar.classList.remove('navbar--scrolled', 'navbar--hidden');
        }
        lastScroll = currentScroll;
    });

});