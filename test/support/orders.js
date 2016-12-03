/**
 * Created by odedpriva on 11/30/16.
 */

'use strict';
let beverage = require('./beverages');
let counter = 0;
function asOrderItem(itemExample) {
  return {
    beverage: beverage[itemExample.beverage](),
    quantity: itemExample.quantity
  };
}
module.exports = {
  empty: function () {
    return {
      id: '<empty order>',
      data: []
    }; },
  withItems: function (itemExamples) {
    counter += 1;
    return {
      id: '<non empty order ' + counter + '>',
      data: itemExamples.map(asOrderItem)
    };
  } };


