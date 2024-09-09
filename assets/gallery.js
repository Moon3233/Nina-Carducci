document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner toutes les images ayant un attribut data-gallery-tag
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filtersContainer = document.getElementById('filters');

    // Créer un Set pour avoir une liste unique des tags
    const tags = new Set();

    // Parcourir chaque image pour extraire les tags
    galleryItems.forEach(item => {
        tags.add(item.getAttribute('data-gallery-tag'));
    });

    // Créer les boutons de filtre en fonction des tags uniques
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.classList.add('filter-btn'); // Ajouter une classe pour styliser les boutons
        button.dataset.filter = tag; // Ajoute un attribut pour l'utiliser dans le filtre

        // Ajout de l'événement de clic pour filtrer les images
        button.addEventListener('click', function () {
            filterGallery(tag);
        });

        // Ajouter le bouton au container des filtres
        filtersContainer.appendChild(button);
    });

    // Ajouter un bouton pour afficher toutes les images
    const allButton = document.createElement('button');
    allButton.textContent = "Tous";
    allButton.classList.add('filter-btn', 'selected'); // Activer le bouton par défaut
    allButton.dataset.filter = 'all'; // Ajouter l'attribut data-filter="all"
    allButton.addEventListener('click', function () {
        filterGallery('all'); // Montrer toutes les images
    });
    filtersContainer.insertBefore(allButton, filtersContainer.firstChild);

    // Fonction pour filtrer la galerie en fonction du tag
    function filterGallery(tag) {
        // Retirer la classe 'selected' de tous les boutons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('selected'));
        
        // Ajouter la classe 'selected' au bouton actuellement cliqué
        document.querySelector(`[data-filter="${tag}"]`).classList.add('selected');
    
        // Filtrer les images
        galleryItems.forEach(item => {
            if (tag === 'all' || item.getAttribute('data-gallery-tag') === tag) {
                item.parentElement.style.display = 'block'; // Montrer l'image
            } else {
                item.parentElement.style.display = 'none'; // Cacher l'image
            }
        });
    }

    // Afficher toutes les images par défaut
    filterGallery('all');
});
