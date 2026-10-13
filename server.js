const express = require('express'); // 1. charger la bibliothèque Express
const app = express(); // 2. créer l’application : c’est notre serveur
const PORT = 3000;
const articlesRoutes =require('./Router/articlesRoutes.js')
const userRoutes =require('./Router/userRoutes.js')



// Middlewares globaux
app.use(express.json()); // indispensable pour lire le corps JSON (req.body)

// Montage du routeur sous le préfixe '/api/articles'
app.use('/api/articles', articlesRoutes);

app.use('/api/users', userRoutes);


// Route d’accueil pour tester le statut général du serveur
app.get('/', (req, res) => {
    res.json({
        message: "API du Blog - Serveur Modulaire Opérationnel (SoC)"
    });
});

app.listen(PORT, () => {
    console.log(`Serveur modulaire en écoute sur http://localhost:${PORT}`);
});

