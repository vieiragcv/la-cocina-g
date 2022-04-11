const router = require("express").Router();
const { Favorite, Recipe, User } = require("../../models");

router.get("/", (req, res) => {
  Favorite.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: Recipe,
        attributes: ["id", "recipe_name", "description", "image"]
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then(res.status(200))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/recipe", (req, res) => {
  Favorite.create({
    recipe_id: req.body.recipe_id,
    user_id: req.session.user_id,
  })
  .then((favorite) => res.status(200).json(favorite))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/', (req, res) => {
  Favorite.destroy({
    where: {
      recipe_id: req.body.recipe_id,
      user_id: req.session.user_id,
    }
  })
  .then((data) => res.status(200).send())
  .catch((err) => {
    res.status(500).json(err);
  });
});


module.exports = router;
