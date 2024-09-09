document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Défilement automatique toutes les 5 secondes
    let autoSlideInterval = setInterval(nextSlide, 5000);

    // Fonction pour passer à une diapositive spécifique
    function goToSlide(index) {
        currentIndex = index;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateActiveIndicator();
    }

    // Fonction pour mettre à jour les indicateurs actifs
    function updateActiveIndicator() {
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }

    // Arrêter le défilement automatique
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Ajout d'événements aux indicateurs pour changer de slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();  // Arrêter l'auto-défilement
            goToSlide(index);
        });
    });

    // Fonction pour passer à la prochaine diapositive
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        goToSlide(currentIndex);
    }

    // Fonction pour passer à la diapositive précédente
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        goToSlide(currentIndex);
    }

    // Ajouter les événements pour les boutons "Précédent" et "Suivant"
    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        stopAutoSlide();  // Arrêter l'auto-défilement
        prevSlide();
    });

    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        stopAutoSlide();  // Arrêter l'auto-défilement
        nextSlide();
    });
});
