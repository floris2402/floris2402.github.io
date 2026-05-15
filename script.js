document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Cette ligne fait apparaître/disparaître le menu
            navLinks.classList.toggle('active');
            
            // Cette ligne transforme les 3 barres en croix (si configuré en CSS)
            menuToggle.classList.toggle('is-active');
        });

        // Fermer le menu automatiquement quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});

// Fonction appelée lors du clic sur le bouton de téléchargement
function telechargerApp() {
    alert("Merci de votre intérêt ! L'application sera bientôt disponible sur le Google Play Store.");
    
    // Vous pourrez remplacer l'alerte ci-dessus par le vrai lien de votre application, par ex :
    // window.location.href = "https://play.google.com/store/apps/details?id=com.votre.package";
}

const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
// Note : galleryControls et galleryControlsContainer ne sont plus nécessaires sans boutons

class Carousel {
  constructor(container, items) {
    this.carouselContainer = container;
    this.carouselArray = [...items];
  }

  // Met à jour les classes CSS pour déplacer les images
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

  // Change l'ordre des images dans le tableau selon la direction
  setCurrentState(direction) {
    if (direction === 'previous') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }
}

// Initialisation du carrousel
const exampleCarousel = new Carousel(galleryContainer, galleryItems);
exampleCarousel.updateGallery();

/* --- GESTION DU SCROLL SOURIS (WHEEL) --- */
let isThrottled = false;
window.addEventListener('wheel', (e) => {
  const previewSection = document.getElementById('preview');
  if (!previewSection) return;

  const rect = previewSection.getBoundingClientRect();
  
  // On n'active le carrousel que si la section est visible à l'écran
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    if (!isThrottled) {
      if (e.deltaY > 0) {
        exampleCarousel.setCurrentState('next');
      } else {
        exampleCarousel.setCurrentState('previous');
      }
      
      // Bloque temporairement pour éviter un défilement ultra-rapide
      isThrottled = true;
      setTimeout(() => { isThrottled = false; }, 500); 
    }
  }
}, { passive: true });

/* --- GESTION DU SWIPE MOBILE (TOUCH) --- */
let touchstartX = 0;
let touchendX = 0;

galleryContainer.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
}, { passive: true });

galleryContainer.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesture();
}, { passive: true });

function handleGesture() {
  const delta = 50; // Seuil de sensibilité en pixels
  if (touchendX < touchstartX - delta) {
    exampleCarousel.setCurrentState('next'); // Swipe vers la gauche
  }
  if (touchendX > touchstartX + delta) {
    exampleCarousel.setCurrentState('previous'); // Swipe vers la droite
  }
}
