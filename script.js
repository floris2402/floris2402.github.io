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
