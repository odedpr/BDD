/**
 * Created by odedpriva on 11/23/16.
 */


'use strict';
let chai = require('chai')
  , sinon = require('sinon')
  , orderSystemWith = require('../lib/orders');


chai.use(require('chai-as-promised'));
let expect = chai.expect;


describe('Customer displays order', function () {
  beforeEach(function () {
    this.orderDAO = {
      byId: sinon.stub()
    };
    this.orderSystem = orderSystemWith(this.orderDAO);
  });
  context('Given that the order is empty', function() {
    let orderId;
    beforeEach(function () {
      orderId = 'some empty order id';
      this.orderDAO.byId
          .withArgs(orderId)
          .callsArgWithAsync(1, null, []);
      this.result = this.orderSystem.display(orderId);
    });

    it('will show no order items', function () {
      return expect(this.result).to.eventually.have.property('items')
          .that.is.empty;
    });
    it('will show 0 as total price', function () {
      return expect(this.result).to.eventually.have.property('totalPrice')
            .that.is.equal(0);
    });
    it('will only be possible to add a beverage', function () {
      return expect(this.result).to.eventually.have.property('actions')
        .that.is.deep.equal([{
          action: 'append-beverage',
          target: orderId,
          parameters: {
            beverageRef: null,
            quantity: 0 }
        }]);
    });

  });

  function orderAlreadyContainsItems(orderDAO, orderId, items) {
    orderDAO.byId
        .withArgs(orderId)
        .callsArgWithAsync(1, null, items);
    return items;
  }

  context('Given that the order contains beverages', function() {

    beforeEach(function () {
      this.orderId = 'some non empty order id';
      this.expresso = {
        id: 'expresso id',
        name: 'Expresso',
        price: 1.50
      };
      this.mocaccino = {
        id: 'mocaccino id',
        name: 'Mocaccino',
        price: 2.30
      };
      this.orderItems = orderAlreadyContainsItems(this.orderDAO, this.
          orderId, [
        { beverage: this.expresso, quantity: 1},
        { beverage: this.mocaccino, quantity: 2}
          ]);
      this.result = this.orderSystem.display(this.orderId);
    });


    it('will show one item per beverage');
    it('will show the sum of the unit prices as total price');
    it('will be possible to place the order');
    it('will be possible to add a beverage');
    it('will be possible to remove a beverage');
    it('will be possible to change the quantity of a beverage');

  });

  context('Given that the order has pending messages', function(){

    it('will show the pending messages');
    it('there will be no more pending messages');

  });

});

