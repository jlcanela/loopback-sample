'use strict';

module.exports = function (Product) {
    const validQuantity = quantity => Boolean(quantity > 0);

    /*
    Buy this product
    @param {number} quantity Number of products to buy
    @param {Function(Error,Object)} callback
    */
    Product.prototype.buy = async function (quantity) {
        if (!validQuantity(quantity)) throw `Invalid quantity ${quantity}`;

        return {
            result: `you bought ${quantity} product(s) of type '${this.name}'`,
        };
    };

    Product.validatesLengthOf('name', {
        min: 3,
        message: {
            min: 'name should be at least 3 characters',
        },
    });

    Product.validatesUniquenessOf('name');

    const positiveInteger = /^[0-9]*$/;

    const ValidatePositivePriceInteger = function (err) {
        if (!positiveInteger.test(this.price)) {
            err();
        }
    };

    Product.validate('price', ValidatePositivePriceInteger, {
        message: 'Price should be a positive integer',
    });

    /*
    async function validateMinimalPriceAsync() {
         const price =this.price;
         const minimalPriceFromDB = 99;
    }
    */
    function validateMinimalPrice (err, done) {
        const price = this.price;

        process.nextTick(() => {
            const minimalPriceFromDB = 99;
            if (price < minimalPriceFromDB) {
                err();
            }

            done();
        });
    };

    Product.validateAsync('price', validateMinimalPrice, {
        message: 'Price should be higher than the minimal price in the DB',
    });
};
