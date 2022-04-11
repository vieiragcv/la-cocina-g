const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Recipe, User, Comment, RecipeCategory, Category } = require('../../models');

/*---------------------------------------------------------------
-                         GET ALL RECIPES
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            attributes: [
              'id',
              'recipe_name',
              'description',
              'user_id',
              'steps',
              'ingredients',
              'time',
              'servings',
              'image'
            ],
            order: [['created_at', 'DESC']],
            include: [
              {
                model: Comment,
                attributes: ['id', 'comment', 'recipe_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['user_name']
                }
              },
              {
                model: User,
                attributes: ['user_name']
              }
            ]
          });
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});


/*---------------------------------------------------------------
-                         GET 1 RECIPE
---------------------------------------------------------------*/

router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'recipe_name',
                'description',
                'user_id',
                'steps',
                'ingredients',
                'time',
                'servings',
                'image'
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment', 'recipe_id', 'user_id', 'created_at'],
                  include: {
                    model: User,
                    attributes: ['user_name']
                  }
                },
                {
                  model: User,
                  attributes: ['user_name']
                },
                {
                    model: Category,
                    attributes: ['category_name']
                  }
              ]
        });
        if (!recipeData) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/*---------------------------------------------------------------
-                         CREATE 1 RECIPES
---------------------------------------------------------------*/

router.post('/', async (req, res) => {
    try {
        const createRecipe = await Recipe.create({
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            user_id: req.session.user_id,
            steps: req.body.steps.split(/\r?\n/),
            ingredients: req.body.ingredients.split(/\r?\n/),
            time: req.body.time,
            servings: req.body.servings,
            image: req.body.image || 'https://i.imgur.com/uBf1lrk.png'
        });
        res.status(200).json(createRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
});

/*---------------------------------------------------------------
-                         UPDATE 1 RECIPE
---------------------------------------------------------------*/

router.put('/:id', async (req, res) => {
    try {
        const updateRecipe = await Recipe.update({
            recipe_name: req.body.recipe_name,
            description: req.body.description,
            steps: req.body.steps,
            ingredients: req.body.ingredients,
            time: req.body.time
        },
        {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(updateRecipe);
    } catch (err) {
        res.status(400).json(err);
    }
})

/*---------------------------------------------------------------
-                         DELETE 1 RECIPES
---------------------------------------------------------------*/

router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!recipeData) {
            res.status(400).json({ message: 'There is not a recipe with that id.'});
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/search/:query', async (req, res) => {
    try {
        const recipeData = await sequelize.query('SELECT id, recipe_name FROM recipe WHERE LOWER(recipe_name) LIKE LOWER(?);', {
            replacements: [`%${req.params.query}%`],
            model: Recipe,
            mapToModel: true
          });

        res.status(200).json(recipeData);
    } catch (err) {
       
        res.status(500).json(err);
    }
})

module.exports = router;