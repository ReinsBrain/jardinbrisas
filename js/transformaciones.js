document.addEventListener('DOMContentLoaded', () => {
    // BASE DE DATOS DE PROYECTOS
    const projects = [
        {
            id: 1,
            title: "Recuperación de Jardín Frontal",
            category: "integral",
            date: "2026-04-10",
            location: "Brisas de Villa",
            description: "Trabajo intensivo en área verde abandonada. Remoción de maleza, nivelación de tierra y perfilado estético de arbustos principales.",
            images: [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", // Antes
                "https://images.unsplash.com/photo-1558904541-efa843a96f0f?auto=format&fit=crop&w=400&q=80", // Proceso
                "https://images.unsplash.com/photo-1416879598553-3cb00cb105fc?auto=format&fit=crop&w=400&q=80"  // Después
            ]
        },
        {
            id: 2,
            title: "Poda Estética de Ficus",
            category: "poda",
            date: "2026-03-25",
            location: "Parque Agua Mariana",
            description: "Poda técnica de reducción de copa y perfilado simétrico para evitar contacto con cableado y mejorar la entrada de luz natural.",
            images: [
                "https://images.unsplash.com/photo-1592424001809-5a1e80ea42ba?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80"
            ]
        },
        {
            id: 3,
            title: "Mantenimiento y Corte de Grass",
            category: "grass",
            date: "2026-04-18",
            location: "Residencial Sur",
            description: "Uso de maquinaria a motor para emparejamiento total del césped, limpieza de bordes y recojo absoluto de residuos orgánicos.",
            images: [
                "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1599598425947-330026e6378e?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1557428830-8c6f1406e4ed?auto=format&fit=crop&w=400&q=80"
            ]
        }
    ];

    const container = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const dateSort = document.getElementById('date-sort');
    const emptyState = document.getElementById('empty-state');

    // Etiquetas Narrativas
    const imageLabels = ["1. Estado Inicial", "2. En Proceso", "3. Resultado Final"];

    // Función Render
    const renderProjects = (data) => {
        container.innerHTML = '';
        if (data.length === 0) { emptyState.style.display = 'block'; return; }
        emptyState.style.display = 'none';

        data.forEach(project => {
            // Generar imágenes con etiquetas flotantes animadas
            const imagesHtml = project.images.map((img, index) => `
                <div class="album-img-wrapper">
                    <img src="${img}" alt="${project.title} - Fase ${index + 1}" loading="lazy">
                    <div class="img-overlay-label">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <span>${imageLabels[index]}</span>
                    </div>
                </div>
            `).join('');

            const waText = encodeURIComponent(`Hola Jardín Brisas, deseo cotizar un trabajo similar a su proyecto: "${project.title}".`);
            
            const projectCard = `
                <article class="album-card reveal active">
                    <div class="album-header">
                        <div class="album-meta">
                            <span class="album-date"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${formatDate(project.date)}</span>
                            <span class="album-location"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${project.location}</span>
                        </div>
                        <h2 class="album-title">${project.title}</h2>
                        <p class="album-desc">${project.description}</p>
                    </div>
                    
                    <div class="album-gallery">
                        ${imagesHtml}
                    </div>
                    
                    <div class="album-footer">
                        <a href="https://wa.me/51932195077?text=${waText}" class="btn-solicitar" target="_blank" rel="noopener noreferrer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            Cotizar este trabajo
                        </a>
                    </div>
                </article>
            `;
            container.innerHTML += projectCard;
        });
    };

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('es-ES', options);
    };

    const handleFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortOrder = dateSort.value;

        let filtered = projects.filter(p => {
            const matchSearch = p.title.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm);
            const matchCategory = category === 'all' || p.category === category;
            return matchSearch && matchCategory;
        });

        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
        renderProjects(filtered);
    };

    searchInput.addEventListener('input', handleFilters);
    categoryFilter.addEventListener('change', handleFilters);
    dateSort.addEventListener('change', handleFilters);

    // Inicializar la galería
    renderProjects(projects.sort((a, b) => new Date(b.date) - new Date(a.date)));
});