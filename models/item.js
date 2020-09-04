'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Item.init({
        ownerId: DataTypes.INTEGER,
        description: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        dueDate: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Item',
    });
    Item.associate = function (models) {
        Item.belongsTo(models.User, {
            foreignKey: 'ownerId',
            onDelete: 'CASCADE'
        })

    }

    return Item;
};