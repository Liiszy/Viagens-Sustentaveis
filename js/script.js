document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    const itemsPerSlide = 4; // Quantidade de itens visíveis por slide
    const totalItems = items.length;
    let currentIndex = 0;

    function updateCarousel() {
        const width = carousel.clientWidth / itemsPerSlide;
        carousel.style.transform = `translateX(${-currentIndex * width}px)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + itemsPerSlide) % totalItems;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - itemsPerSlide + totalItems) % totalItems;
        updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Inicializa a posição correta do carrossel
});




