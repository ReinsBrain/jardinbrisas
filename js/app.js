document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CARGA MODULAR DE COMPONENTES (Arquitectura)
    const loadComponents = async () => {
        try {
            // Cargar Navbar
            const navRes = await fetch('components/navbar.html');
            if(navRes.ok) {
                document.getElementById('header-container').innerHTML = await navRes.text();
            }
            // Cargar Footer
            const footRes = await fetch('components/footer.html');
            if(footRes.ok) {
                document.getElementById('footer-container').innerHTML = await footRes.text();
            }
        } catch (error) {
            console.error("Error cargando componentes. Asegúrate de usar Live Server.", error);
        }
    };

    // 2. LÓGICA DEL CARRUSEL (Hero Section)
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

        // Event Listeners
        nextBtn?.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn?.addEventListener('click', () => { prevSlide(); resetInterval(); });

        // Auto play
        const startInterval = () => { slideInterval = setInterval(nextSlide, 5000); };
        const resetInterval = () => { clearInterval(slideInterval); startInterval(); };
        
        startInterval();
    };

    // 3. ANIMACIONES AL HACER SCROLL (Intersection Observer API)
    const initScrollAnimations = () => {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Solo anima una vez
                }
            });
        }, { threshold: 0.15 });

        reveals.forEach(reveal => observer.observe(reveal));
    };

    // 4. PRELOADER (Experiencia de Usuario)
    const initPreloader = () => {
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 800); // Pequeño delay intencional para mostrar la elegancia
        });
    };

    // Ejecutar todo
    loadComponents().then(() => {
        // Aquí podrías inicializar lógica específica del navbar como el menú móvil
        console.log("Arquitectura base cargada.");
    });
    initCarousel();
    initScrollAnimations();
    initPreloader();
});

XMLDocument