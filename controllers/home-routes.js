const { Recipe, Comment, User, Category, Favorite } = require('../models');

const router = require('express').Router();



/*---------------------------------------------------------------
-                         RENDER HOMEPAGE
---------------------------------------------------------------*/

router.get('/', async (req, res) => {
    try {
      const dbRecipeData = await Recipe.findAll({
        attributes: [
          "id",
          "recipe_name",
          "image",
          "user_id"
        ],
        include: [
          {
            model: User,
            attributes: ["user_name"]
          },
          {
           model: Category,
           attributes: ["category_name"] 
          }
        ]
      }) 

      const dbCategoryData = await Category.findAll({
        attributes: [
          "category_name"
        ]
      })

      const categories = dbCategoryData.map((category) =>
        category.get({plain: true})
        );
      const recipes = dbRecipeData.map((recipe) =>
        recipe.get({ plain: true})
        );
      res.render('homepage', {
        recipes,
        categories,
        loggedIn: req.session.loggedIn
      });
      
    }  catch (err) {
      res.status(500).json(err);
    }
  });

/*---------------------------------------------------------------
-                         RENDER LOGIN
---------------------------------------------------------------*/

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

/*---------------------------------------------------------------
-                         RENDER DASHBOARD
---------------------------------------------------------------*/

router.get('/dashboard', (req, res) => {
  Recipe.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: User,
        attributes: ['user_name'],
      }
    ]
  })
    .then(dbRecipeData => {
      const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
      res.render('dashboard', { recipes });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
/*---------------------------------------------------------------
-                         RENDER 1 RECIPE
---------------------------------------------------------------*/

router.get('/recipe/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "recipe_name",
      "description",
      "user_id",
      "steps",
      "ingredients",
      "time",
      "servings",
      "image"

    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "recipe_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["user_name"],
        },
      },
      {
        model: User,
        attributes: ["user_name"],
      },
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Favorite,
        attributes: ["id"],
        where:{
          user_id: req.session.user_id || 0
        },
        required: false 
      }
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }

      // serialize the data
      const recipe = dbRecipeData.get({ plain: true });

      recipe.Comments.forEach(c => {
        c['canDelete'] = c.user_id === req.session.user_id
      })

      // pass data to template
      res.render("single-recipe", {
        recipe,
        loggedIn: req.session.loggedIn,
        current_user_id: req.session.user_id
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*---------------------------------------------------------------
-                         RENDER FAVORITES
---------------------------------------------------------------*/

router.get('/favorites', (req, res) => {  
  Favorite.findAll({
    attributes: 
    [
      "id"
    ],
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Recipe,
        attributes: ["id", "recipe_name", "description", "user_id", "image"],
      }
    ]
})
.then((dbFavoriteData) => {
  if (!dbFavoriteData) {
    res.status(404).json({ message: "No favorites found with this name" });
    return;
  }

  // serialize the data
  const favorites = dbFavoriteData.map(favorites => favorites.get({ plain: true }));

  // pass data to template
  res.render("favorites", {
    favorites,
    loggedIn: req.session.loggedIn
  });
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});

/*---------------------------------------------------------------
-                         RENDER CATEGORIES
---------------------------------------------------------------*/

router.get('/categories', (req, res) => {  
  Category.findAll({
    attributes: 
      [ "id",
        "category_name"
      ],
      include: [
        {
          model: Recipe,
          attributes: ["id", "recipe_name", "description", "user_id", "image"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        }
      ]
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No category found with this name" });
        return;
      }

      // serialize the data
      const category = dbCategoryData.map(category => category.get({ plain: true }));
       
      // pass data to template
      res.render("categories", {
        category,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
 
});

router.get('/category/:category_name', async (req, res) => {  
  try {
    const dbCategoryData = await Category.findOne({
      where: {
        category_name: req.params.category_name,
      },
      attributes: 
        [ "id",
          "category_name"
        ],
        include: [
          {
            model: Recipe,
            attributes: ["id", "recipe_name", "description", "user_id", "image"],
            include: {
              model: User,
              attributes: ["user_name"],
            },
          }
        ]
    })

    const dbAllCategoryData = await Category.findAll({
      attributes: [
        "category_name"
      ]
    })

    const category = dbCategoryData.get({plain: true})

    const categories = dbAllCategoryData.map((allCategories) =>
      allCategories.get({plain: true})
    );

    res.render('single-category', {
      category,
      categories,
      loggedIn: req.session.loggedIn
    });
  } catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
