/**
 * Created by odedpriva on 11/23/16.
 */


'use strict';
let chai = require('chai')
    , expect = chai.expect
    , newStorage = require('./support/storageDouble')
    , order = require('./support/examples/orders')
    , orderSystemWith = require('../lib/orders');

chai.use(require('chai-as-promised'));

describe('Customer displays order', function () {

  beforeEach(function () {
    this.orderStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao());
  });

  context('Given that the order is empty', function() {
    let orderId;
    beforeEach(function () {
      this.order = this.orderStorage.alreadyContains(order.empty());
      this.result = this.orderSystem.display(this.order.id);
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
          target: this.order.id,
          parameters: {
            beverageRef: null,
            quantity: 0 }
        }]);
    });
  });

  context('Given that the order contains beverages', function() {

    beforeEach(function () {
      this.order = this.orderStorage
          .alreadyContains(order.withItems([
            { beverage: 'expresso', quantity: 1},
            { beverage: 'mocaccino', quantity: 2} ]));
      this.result = this.orderSystem.display(this.order.id);
    });


    it('will show one item per beverage', function () {
      return expect(this.result).to.eventually.have.property('items')
          .that.is.deep.equal(this.order.data);

    });
    it('will show the sum of the unit prices as total price');
    it('will be possible to place the order', function () {
      return expect(this.result).to.eventually
          .have.property('actions')
          .that.include({
            action: 'place-order',
            target: this.order.id
          });
    });
    it('will be possible to add a beverage', function () {
      return expect(this.result).to.eventually
          .have.property('actions')
          .that.include({
            action: 'append-beverage',
            target: this.order.id,
            parameters: {
              beverageRef: null,
              quantity: 0 }
          }); });

    it('will be possible to remove a beverage', function () {
      return expect(this.result).to.eventually
          .have.property('actions')
          .that.include({
            action: 'remove-beverage',
            target: this.order.id,
            parameters: {
              beverageRef: beverage.expresso().id
            }
          })
          .and.that.include({
            action: 'remove-beverage',
            target: this.order.id,
            parameters: {
              beverageRef: beverage.mocaccino().id
            }
          });
    });
    it('will be possible to change the quantity of a beverage');

  });

  context.skip('Given that the order has pending messages', function(){

    it('will show the pending messages');
    it('there will be no more pending messages');

  });

});

