document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    let currentIndex = 0;

    // Ouvrir le modal quand on clique sur une image
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImage.src = this.src; // Montrer l'image cliquée dans le modal
            currentIndex = index; // Mémoriser l'index de l'image
        });
    });

    // Navigation vers l'image précédente
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        modalImage.src = galleryItems[currentIndex].src;
    });

    // Navigation vers l'image suivante
    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        modalImage.src = galleryItems[currentIndex].src;
    });

    // Fermer le modal si on clique en dehors de l'image
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
