const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
    try {
        const categoryData = await Category.findAll({
            include: [{ model: Product, through: Category, as: 'category_id' }],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
    // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: Product, through: Category, as: 'category_id' }],
        });

        if (!categoryData) {
            res.status(404).json({
                message: 'No category found with this id!',
            });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((category) => {
            // find all associated tags from ProductTag
            return Category.findAll({ where: { category_id: req.params.id } });
        })
        .then((category) => {
            // get list of current tag_ids
            const categoryId = category.map(({ category_id }) => category_id);
            // create filtered list of new tag_ids
            const newCategory = req.body.categoryId
                .filter((category_id) => !categoryId.includes(category_id))
                .map((category_id) => {
                    return {
                        category_id: req.params.id,
                        category_id,
                    };
                });
            // figure out which ones to remove
            const categoryToRemove = category
                .filter(
                    ({ category_id }) => !req.body.tagIds.includes(category_id)
                )
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                category.destroy({ where: { id: categoryToRemove } }),
                Category.bulkCreate(newCategory),
            ]);
        })
        .then((updatedCategory) => res.json(updatedCategory))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!categoryData) {
            res.status(404).json({
                message: 'No category found with this id!',
            });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
