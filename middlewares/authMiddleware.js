const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// 1. Protection des routes : vérifie la validité du token
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, invalid or expired token' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token provided' });
};

// 2. Contrôle d'accès par rôle (RBAC) : administrateur uniquement
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied: administrator privileges required' });
};

module.exports = { protect, adminOnly };