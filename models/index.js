// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(models.Category, {});
// Categories have many Products
Category.hasMany(models.Product, {});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(models.Tag, {
    through: {
        model: ProductTag,
    },
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
    },
});

module.exports = {
    Product,
    Category,
    Tag,
    ProductTag,
};
