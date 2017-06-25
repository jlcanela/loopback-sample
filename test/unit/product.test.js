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
