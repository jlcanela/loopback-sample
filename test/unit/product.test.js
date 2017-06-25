'use strict';

const { app, expect, should } = require('../common');

const Product = app.models.Product;

describe('it should resolve', function () {
    it('a product.find', function () {
        return Product
            .find();
    });
});

describe('Custom method', function () {
    it('should allow buying a product', async function () {
        const product = new Product({ name: 'buy-product', price: 299 });
        const result = await product.buy(10);
        return expect(result.status).to.contain('you bought 10 product(s)');
    });

    it('should not allow buying a negative product quantity',
        async function () {
            const product = new Product({ name: 'buy-product', price: 299 });
            const result = product.buy(-10);
            return expect(result).to.be.rejectedWith(/Invalid quantity -10/);
        });
});

describe('Validation', function () {
    it('should reject a name < 3 chars', async function () {
        return Product.create({ name: 'a', price: 299 })
            .then((res) => Promise.reject('Product should not be created'))
            .catch((err) => {
                expect(err.message)
                    .to.contain('name should be at least 3 characters');
                expect(err.statusCode).to.be.equal(422);
            });
    });

    it('should reject a duplicate name', async function () {
        await Product.create({ name: 'good product', price: 299 });
        return Product.create({ name: 'good product', price: 299 })
            .then((res) => Promise.reject('Product should not be created'))
            .catch((err) => {
                expect(err.message)
                    .to.contain('Details: `name` is not unique');
                expect(err.statusCode).to.be.equal(422);
            });
    });

    it('should reject a price < 0', function () {
        return Product.create({ name: 'product', price: -1 })
            .then((res) => Promise.reject('Product should not be created'))
            .catch((err) => {
                expect(err.message)
                    .to.contain('Price should be a positive integer');
                expect(err.statusCode).to.be.equal(422);
            });
    });

    it('should reject a low price', function () {
        return Product.create({ name: 'product', price: 98 })
            .then((res) => Promise.reject('Product should not be created'))
            .catch((err) => {
                expect(err.message)
                    .to.contain('should be higher than the minimal price');
                expect(err.statusCode).to.be.equal(422);
            });
    });

    it('should store a valid Product', function () {
        return Product.create({ name: 'all good', price: 200 })
            .then((res) => {
                expect(res.name)
                    .to.contain('all good');
                expect(res.price).to.be.equal(200);
            });
    });
});

describe('Hooks', function () {
    it('shound not allow adding a product to non-existing category',
        function () {
            return Product.create(
                { name: 'product', price: 200, categoryId: 9999 })
                .then((res) => expect(res).to.be.equal(null))
                .catch((err) => {
                    expect(err)
                        .to.contain(
                            'Error adding product to non-existing category');
                });
        });
});
