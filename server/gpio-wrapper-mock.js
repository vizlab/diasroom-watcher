var Q = require('q');

module.exports = function() {
  var deferred = Q.defer();
  deferred.resolve(200);
  return deferred.promise;
};
