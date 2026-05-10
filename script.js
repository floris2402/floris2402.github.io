// script.js - Alerte Marc

document.addEventListener("DOMContentLoaded", function() {
    console.log("Le site Alerte Marc est chargé avec succès !");

    // Gestion du défilement fluide pour les liens du menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    // Au clic sur le burger, on ajoute ou retire la classe "active"
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animation optionnelle du burger (transformation en croix)
        menuToggle.classList.toggle('is-active');
    });

    // Fermer le menu automatiquement quand on clique sur un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

// Fonction appelée lors du clic sur le bouton de téléchargement
function telechargerApp() {
    alert("Merci de votre intérêt ! L'application sera bientôt disponible sur le Google Play Store.");
    
    // Vous pourrez remplacer l'alerte ci-dessus par le vrai lien de votre application, par ex :
    // window.location.href = "https://play.google.com/store/apps/details?id=com.votre.package";
}
