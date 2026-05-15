document.addEventListener("DOMContentLoaded", function() {
    // --- GESTION DU MENU MOBILE ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // --- LOGIQUE DU CARROUSEL ---
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');

    class Carousel {
        constructor(container, items) {
            this.carouselContainer = container;
            this.carouselArray = [...items];
        }

        updateGallery() {
            this.carouselArray.forEach(el => {
                el.classList.remove('gallery-item-1');
                el.classList.remove('gallery-item-2');
                el.classList.remove('gallery-item-3');
            });

            this.carouselArray.slice(0, 3).forEach((el, i) => {
                el.classList.add(`gallery-item-${i + 1}`);
            });
        }

        setCurrentState(direction) {
            if (direction === 'previous') {
                this.carouselArray.unshift(this.carouselArray.pop());
            } else {
                this.carouselArray.push(this.carouselArray.shift());
            }
            this.updateGallery();
        }
    }

    const exampleCarousel = new Carousel(galleryContainer, galleryItems);
    exampleCarousel.updateGallery();

    // --- GESTION DU SCROLL SOURIS (WHEEL) ---
    let isThrottled = false;
    window.addEventListener('wheel', (e) => {
        const previewSection = document.getElementById('preview');
        if (!previewSection) return;

        const rect = previewSection.getBoundingClientRect();
        // On active si la section occupe le centre de l'écran
        const isVisible = (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2);

        if (isVisible) {
            if (!isThrottled) {
                if (e.deltaY > 0) {
                    exampleCarousel.setCurrentState('next');
                } else {
                    exampleCarousel.setCurrentState('previous');
                }
                isThrottled = true;
                setTimeout(() => { isThrottled = false; }, 500); 
            }
        }
    }, { passive: true });

    // --- GESTION DU SWIPE MOBILE (TOUCH) ---
    let touchstartX = 0;
    let touchendX = 0;

    galleryContainer.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryContainer.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        const delta = 50;
        if (touchendX < touchstartX - delta) exampleCarousel.setCurrentState('next');
        if (touchendX > touchstartX + delta) exampleCarousel.setCurrentState('previous');
    }, { passive: true });
});

function telechargerApp() {
    alert("Merci de votre intérêt ! L'application sera bientôt disponible sur le Google Play Store.");
}
