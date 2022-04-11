const User = require("./User");
const Recipe = require("./Recipe");
const Favorite = require("./Favorite");
const Category = require("./Category");
const Comment = require("./Comment");
const RecipeCategory = require("./RecipeCategory");

User.belongsToMany(Recipe, { through: Favorite });
Recipe.hasMany(Favorite);
Favorite.belongsTo(Recipe);
User.hasMany(Favorite);
Favorite.belongsTo(User);

Favorite.belongsTo(User, {
  foreignKey: "id",
});

Favorite.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

User.hasMany(Favorite, {
  foreignKey: "user_id",
});

Recipe.hasMany(Favorite, {
  foreignKey: "recipe_id",
});

Recipe.belongsToMany(Category, { through: RecipeCategory });
Category.belongsToMany(Recipe, { through: RecipeCategory });
Recipe.hasMany(RecipeCategory);
RecipeCategory.belongsTo(Recipe);
Category.hasMany(RecipeCategory);
RecipeCategory.belongsTo(Category);

Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

User.hasMany(Recipe, {
  foreignKey: "user_id",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Recipe.hasMany(Comment, {
  foreignKey: "recipe_id",
});

module.exports = {
  Favorite,
  User,
  Category,
  Recipe,
  RecipeCategory,
  Comment,
};
