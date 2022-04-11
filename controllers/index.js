const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe, Category } = require('../models');

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js"); 
const dashboardRoutes = require('./dashboard-routes');

router.use("/api", apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes); 

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
