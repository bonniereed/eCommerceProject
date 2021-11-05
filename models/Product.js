// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
    {
        product_id: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    {
        product_name: DataTypes.STRING,
        allowNull: false,
    },
    {
        price: DataTypes.DECIMAL,
        allowNull: false,
        isDecimal: true,
    },
    {
        stock: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        isNumeric: true,
    },
    {
        category_id: DataTypes.INTEGER,
        references: {
            model: 'category',
            key: 'id',
            unique: false,
        },
    }
);

module.exports = Product;
