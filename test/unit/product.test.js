'use strict';

const { app, expect, should } = require('../common');

const Product = app.models.Product;

describe('it should resolve', function () {
    it('a product.find', function () {
        return Product
            .find()
            .then((res) => console.log(res));
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
