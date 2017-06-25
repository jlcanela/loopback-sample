'use strict';

const { app, expect, should } = require('../common');

const Category = app.models.Category;
const Product = app.models.Product;

describe('Category', function () {
    describe('Hooks', function () {
        it('should not allow deleting a category with products', async function () {
            const cat = await Category.create({ name: 'my category' });
            const product = await Product.create({ name: 'category-product', price: 299, categoryId: cat.id });
            return Category.destroyById(cat.id)
                .then(res => expect(res).to.equal(null))
                .catch(err => expect(err).to.equal('Error deleting category with Products'));
        });
    });
});
