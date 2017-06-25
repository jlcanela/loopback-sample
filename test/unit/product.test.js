'use strict';

const { app, expect } = require('../common');

const Product = app.models.Product;

describe('it should resolve', function () {
    it('a product.find', function () {
        return Product
            .find()
            .then((res) => console.log(res));
    });
});

describe('Custom method', function () {
    it('should allow buying a product', function () {
        const product = new Product({ name: 'buy-product', price: 299 });
        return product.buy(10, function (err, res) {
            expect(res.status).to.contain('You bought 10 producit(s)');
        });
    });
});
