const sequelize = require('../config/connection');
const { Category, User, Recipe, Comment, RecipeCategory } = require('../models');

const userSeedData = require('./userSeedData.json');
const recipeSeedData = require('./recipeSeedData.json');
const categorySeedData = require('./categorySeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Category.bulkCreate(categorySeedData, {
    individualHooks: true,
    returning: true
  });

  await Promise.all(recipeSeedData.map(async (r) => {
    const newRecipe = await Recipe.create(r, {
      individualHooks: true,
      returning: true,
      include: [
        {model: RecipeCategory},
        {model: Comment}
      ]
    })
  }))

  process.exit(0);
};

seedDatabase();
