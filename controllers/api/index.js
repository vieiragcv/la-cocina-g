const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes');
const commentRoutes = require('./comment-routes');
const categoryRoutes = require('./category-routes');
const favoriteRoutes = require('./favorite-routes.js');
const dashboardRoutes = require('../dashboard-routes.js'); 

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/dashboard', dashboardRoutes); 


module.exports = router;