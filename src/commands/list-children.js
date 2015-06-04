var get = require('../get')
var findItem = require('../find-item')

module.exports = function(path, options) {
	return findItem(path)
}
