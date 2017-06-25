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
});
