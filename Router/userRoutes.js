
const express = require('express');
const router = express.Router();

const userController = require('../Controller/userController');

// Remarque capitale : le préfixe '/api/articles' sera défini dans server.js.
// Ici, '/' représente donc la racine de la ressource : '/api/articles' !

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);



router.delete('/:id', userController.deleteUser) ;

module.exports = router;

