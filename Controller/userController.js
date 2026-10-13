
// Données isolées dans le contrôleur (en mémoire pour cette séance)
const {estNonVide,estEmailValide} = require('../utils/validators');

let users = [
    { id: 1, name: 'Bienvenue sur le blog', email: 'Admin', role: 'Admin' },
    { id: 2, name: 'Bienvenue sur le blog', email: 'Admin', role: 'Admin' }, 
];

let prochainId = 3;

// 1. Récupérer tous les utilisateurs (avec filtre optionnel ?role=...)
const getAllUsers = (req, res) => {
    const { role } = req.query;

    let resultat = users;

    if (role) {
        resultat = users.filter(a => a.role === role);
    }

    res.status(200).json({
        total: resultat.length,
        users: resultat
    });
};

// 2. Récupérer un utilisateur par son ID unique

const getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(a => a.id === id);

    if (!user) {
        return res.status(404).json({
            error: `Utilisateur ${id} introuvable`
        });
    }

    res.status(200).json(user);
};

// 3. Créer un nouvel article
const createUser = (req, res) => {

    const { name, email,role } = req.body;
     if (!estNonVide(name) ) {
        return res.status(400).json({
            error: "le nom est obligatoire"
        });
    }


    if (!estEmailValide(email) ) {
        return res.status(400).json({
            error: "l email  est obligatoire"
        });
    }

    const nouveluser = {
        id: prochainId++,
        name,
        email,
        role
    };

    users.push(nouveluser);

    res.status(201).json({
        message: 'utilisateur créé',
        user: nouveluser
    });
};




// 5. Supprimer un article (DELETE /api/articles/:id)
const deleteUser = (req, res) => {
    const id = Number(req.params.id);

    const userExiste = users.some(a => a.id === id);

    if (!userExiste) {
        return res.status(404).json({
            error: `Impossible de supprimer : utilisateur ${id} introuvable`
        });
    }

    // On filtre pour ne garder que les articles ayant un ID différent
    users = users.filter(a => a.id !== id);

    res.status(200).json({
        message: `utilisateur ${id} supprimé avec succès`
    });
};




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};

