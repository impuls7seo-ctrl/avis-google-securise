// Fonctions Netlify utilisent la syntaxe Node.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // On récupère la clé API depuis les variables d'environnement sécurisées de Netlify
    const apiKey = process.env.GOOGLE_API_KEY;
    const placeId = 'ChIJRxNvRfZ_giERjcDJ-wuc4TI'; // Votre Place ID

    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=name,rating,reviews&key=${apiKey}&language=fr`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== 'OK') {
             return {
                statusCode: 500,
                body: JSON.stringify({ error: `Erreur de l'API Google: ${data.status}` })
            };
        }

        // On retourne les données avec succès
        // 'Access-Control-Allow-Origin': '*' est important pour autoriser votre site Hostinger à appeler cette fonction
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data.result)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Erreur interne du serveur: ${error.message}` })
        };
    }
};
