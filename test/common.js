'use strict';

const app = require('../server/server');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;
const should = chai.should;

module.exports = {
    app,
    expect,
    should,
};
