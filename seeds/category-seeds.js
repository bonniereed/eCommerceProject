const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'Shirts',
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        isInt: true,
        allowNull: false,
    },
    {
        category_name: 'Shorts',
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        isInt: true,
        allowNull: false,
    },
    {
        category_name: 'Music',
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        isInt: true,
        allowNull: false,
    },
    {
        category_name: 'Hats',
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        isInt: true,
        allowNull: false,
    },
    {
        category_name: 'Shoes',
        type: Seq.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        isInt: true,
        allowNull: false,
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
