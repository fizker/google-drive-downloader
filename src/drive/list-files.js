var get = require('../get')

module.exports = function(parent, options) {
	return get(`files?q='${parent.id}' in parents&maxResults=1000`)
		.then(res => res.items)
		.then(options.modifiedAfter && (items => items
			.filter(item => item.modifiedDate > options.modifiedAfter)
		))
}
