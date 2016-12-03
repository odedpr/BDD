/**
 * Created by odedpriva on 11/30/16.
 */

'use strict';
let sinon = require('sinon');

module.exports = function () {

  let dao = {byId: sinon.stub()}
    , storage = {};

  storage.dao = function () {
    return dao;
  };

  storage.alreadyContains = function (entity) {
    let data = entity.data;
    dao.byId
        .withArgs(entity.id)
        .callsArgWithAsync(1, null, data);
    return entity;
  };

  return storage;
};