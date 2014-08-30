var Q = require('q');

module.exports = function() {
  var deferred = Q.defer();
  deferred.resolve(Math.random() * 100 + 200);
  return deferred.promise;
};
