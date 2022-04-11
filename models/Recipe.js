/*
-Recipe Name
-Recipe Description
User id
Steps
Ingredients
Category
Total time
*/

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model{}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        steps: {
            type: DataTypes.JSON,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.JSON,
            allowNull: false
        },
        /* categories: {
            type: DataTypes.JSON,
            allowNull: true
        }, */
        time: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: true 
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe'
    }
);

module.exports = Recipe;