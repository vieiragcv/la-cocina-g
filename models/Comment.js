const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        comment_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id' 
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelNmae: 'comment'
    }
);

module.exports = Comment;