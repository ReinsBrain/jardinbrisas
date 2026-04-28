document.addEventListener('DOMContentLoaded', () => {
    // BASE DE DATOS DEL BLOG (9 Videos Clasificados)
    const blogPosts = [
        {
            id: 1,
            title: "¿Cómo regar macetas sin ahogar la raíz?",
            category: "riego",
            date: "14 ABR 2026",
            source: "Experiencia en Campo",
            thumbnail: "https://images.unsplash.com/photo-1599598425947-330026e6378e?auto=format&fit=crop&w=600&q=80",
            duration: "04:15"
        },
        {
            id: 2,
            title: "Germinando semillas en Brisas de Villa",
            category: "siembra",
            date: "08 ABR 2026",
            source: "Jardín Brisas Doc",
            thumbnail: "https://images.unsplash.com/photo-1592424001809-5a1e80ea42ba?auto=format&fit=crop&w=600&q=80",
            duration: "05:30"
        },
        {
            id: 3,
            title: "El error fatal al podar Ficus en la costa",
            category: "mantenimiento",
            date: "02 ABR 2026",
            source: "Dirección Técnica",
            thumbnail: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=600&q=80",
            duration: "08:10"
        },
        {
            id: 4,
            title: "Corte de Grass: Altura ideal para el verano",
            category: "corte",
            date: "28 MAR 2026",
            source: "Pruebas de Campo",
            thumbnail: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80",
            duration: "03:45"
        },
        {
            id: 5,
            title: "Agua de arroz: ¿Mito o super vitamina?",
            category: "vitaminas",
            date: "20 MAR 2026",
            source: "Laboratorio Comunitario",
            thumbnail: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=600&q=80",
            duration: "06:20"
        },
        {
            id: 6,
            title: "¿Cuánto cuesta y cómo usar estiércol de vaca?",
            category: "abono",
            date: "15 MAR 2026",
            source: "Mercado Local",
            thumbnail: "https://images.unsplash.com/photo-1416879598553-3cb00cb105fc?auto=format&fit=crop&w=600&q=80",
            duration: "07:15"
        },
        {
            id: 7,
            title: "Limpieza de hojas en plantas de interior",
            category: "mantenimiento",
            date: "10 MAR 2026",
            source: "Jardín Brisas Doc",
            thumbnail: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80",
            duration: "04:50"
        },
        {
            id: 8,
            title: "Trasplante seguro: De maceta chica a jardín",
            category: "siembra",
            date: "05 MAR 2026",
            source: "Técnica de Supervivencia",
            thumbnail: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
            duration: "09:00"
        },
        {
            id: 9,
            title: "Sistemas de riego caseros con botellas recicladas",
            category: "riego",
            date: "28 FEB 2026",
            source: "Reciclaje Activo",
            thumbnail: "https://images.unsplash.com/photo-1557428830-8c6f1406e4ed?auto=format&fit=crop&w=600&q=80",
            duration: "05:40"
        }
    ];

    const gridContainer = document.getElementById('video-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('blog-search');
    const emptyState = document.getElementById('empty-state');

    // Función para renderizar
    const renderGrid = (posts) => {
        gridContainer.innerHTML = '';
        if (posts.length === 0) {
            emptyState.style.display = 'block';
            return;
        }
        emptyState.style.display = 'none';

        posts.forEach(post => {
            const card = document.createElement('article');
            card.className = 'video-card reveal active';
            card.innerHTML = `
                <img src="${post.thumbnail}" alt="${post.title}" class="video-card__bg" loading="lazy">
                <div class="video-card__overlay">
                    <div class="video-meta">
                        <span class="category-tag">${post.category.toUpperCase()}</span>
                        <div class="play-icon-wrapper">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>
                    </div>
                    <div class="video-content">
                        <div class="video-info">
                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${post.date}</span>
                            <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${post.duration}</span>
                        </div>
                        <h3>${post.title}</h3>
                        <p class="video-source">Fuente: ${post.source}</p>
                    </div>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    };

    // Función unificada de filtrado (Buscador + Botones)
    const handleFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

        const filteredPosts = blogPosts.filter(post => {
            const matchSearch = post.title.toLowerCase().includes(searchTerm) || post.category.toLowerCase().includes(searchTerm);
            const matchCategory = category === 'all' || post.category === category;
            return matchSearch && matchCategory;
        });

        renderGrid(filteredPosts);
    };

    // Listeners del Buscador
    searchInput.addEventListener('input', handleFilters);

    // Listeners de los Botones
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            handleFilters();
        });
    });

    // Render inicial
    renderGrid(blogPosts);

    // Envío del formulario de la comunidad
    const form = document.getElementById('communityForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit-lab');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Enviando al laboratorio...';
        
        setTimeout(() => {
            btn.innerHTML = '¡Duda recibida, gracias! ✔️';
            btn.style.backgroundColor = '#1ebe5d';
            form.reset();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
});