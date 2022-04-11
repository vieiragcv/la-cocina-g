const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe } = require('../models');
const withAuth = require('../utils/auth');

/*---------------------------------------------------------------
-                     GET ALL RECIPES for specific user
---------------------------------------------------------------*/

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Recipe.findAll({ where: { user_id: req.session.user_id } })
  .then(dbRecipeData => {
    const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true}));
    res.render('dashboard', {recipes, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


/*---------------------------------------------------------------
-                         CREATE  RECIPE
---------------------------------------------------------------*/

router.post('/', async (req, res) => {
  try {

      const createdRecipe = await Recipe.create({
          recipe_name: req.body.recipe_name,
          description: req.body.description,
          user_id: req.body.user_id,
          steps: req.body.steps,
          ingredients: req.body.ingredients,
          time: req.body.time,
          servings: req.params.servings
      });
      res.status(200).json(createdRecipe);
  } catch (err) {
      res.status(400).json(err);
  }
});

/*---------------------------------------------------------------
-                         DELETE RECIPE
---------------------------------------------------------------*/

router.delete('/:id', async (req, res) => {
  try {
      const recipeData = await Recipe.destroy({
          where: {
              id: req.params.id
          }
      });
      if (!recipeData) {
          res.status(400).json({ message: 'No recipe found.'});
          return;
      }
      res.status(200).json(recipeData);
  } catch (err) {
      res.status(500).json(err);
  }
});

/*---------------------------------------------------------------
-                         EDIT RECIPE
---------------------------------------------------------------*/

router.get('/recipe/:id', withAuth, (req, res) => {
  Recipe.findByPk(req.params.id)
    .then(dbRecipeData => {
      if (dbRecipeData) {
        const recipe = dbRecipeData.get({ plain: true });
        res.render('single-recipe'/* , {
          post,
          loggedIn: true
        } */);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;