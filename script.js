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

// Fonction appelée lors du clic sur le bouton de téléchargement
function telechargerApp() {
    alert("Merci de votre intérêt ! L'application sera bientôt disponible sur le Google Play Store.");
    
    // Vous pourrez remplacer l'alerte ci-dessus par le vrai lien de votre application, par ex :
    // window.location.href = "https://play.google.com/store/apps/details?id=com.votre.package";
}