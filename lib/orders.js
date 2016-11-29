/**
 * Created by odedpriva on 11/24/16.
 */

'use strict';

function test(orderDAO) {
  return {
    display: function (id) {
      let items, totalPrice, actions;
      let orders = orderDAO.byId(id);
      if (orders.length <= 0) {
        items = [];
        totalPrice = 0;
        actions = {
          action: 'append-beverage',
          target: id,
          parameters: {
            beverageRef: null,
            quantity: 0
          }
        };
      }
      return {
        items: items,
        totalPrice: totalPrice,
        actions: [actions]
      };
    }
  };
}

module.exports = test