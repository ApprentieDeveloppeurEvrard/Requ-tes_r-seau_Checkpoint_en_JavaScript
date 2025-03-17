// Sélection des éléments HTML que l'on va manipuler
const button = document.getElementById('fetch-weather-button');
const input = document.getElementById('city-name');
const locationDisplay = document.getElementById('location');
const temperatureDisplay = document.getElementById('temperature');
const descriptionDisplay = document.getElementById('description');

// Fonction pour récupérer les données météo depuis l'API
async function fetchWeatherData(city) {
    const apiKey = 'VOTRE_CLE_API'; // Remplacez par votre clé API OpenWeather
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
        // On envoie la requête HTTP pour obtenir les données météo
        const response = await fetch(url);
        
        // Si la réponse est correcte, on récupère les données en JSON
        const data = await response.json();

        // Si la ville est trouvée et les données sont correctes
        if (data.cod === 200) {
            // Mise à jour des éléments HTML avec les données récupérées
            locationDisplay.textContent = `Ville : ${data.name}, ${data.sys.country}`;
            temperatureDisplay.textContent = `Température : ${data.main.temp}°C`;
            descriptionDisplay.textContent = `Description : ${data.weather[0].description}`;
        } else {
            // Si la ville n'est pas trouvée
            alert('Ville non trouvée !');
        }
    } catch (error) {
        // Gestion des erreurs, par exemple, si l'API est inaccessible
        console.error('Erreur:', error);
        alert('Il y a eu une erreur lors de la récupération des données météo.');
    }
}

// Lorsque l'utilisateur clique sur le bouton
button.addEventListener('click', function() {
    const city = input.value; // Récupération de la ville entrée par l'utilisateur

    if (city) {
        // Si une ville est entrée, on appelle la fonction pour récupérer la météo
        fetchWeatherData(city);
    } else {
        // Si aucune ville n'est entrée, on alerte l'utilisateur
        alert('Veuillez entrer le nom d\'une ville.');
    }
});
