/**
 * Created by odedpriva on 11/24/16.
 */

'use strict';

function test(orderDAO) {
  return {
    display: function (id) {
      return new Promise(function (resolve, reject) {
        let items, totalPrice, actions;
        orderDAO.byId(id, function (err, value) {
          if (err) throw err;
          if (value.length <= 0) {
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
            resolve({
              items: items,
              totalPrice: totalPrice,
              actions: [actions]
            });
          }
        });
      });
    }
  };
}

module.exports = test;
