var get = require('./get')

module.exports = function(path) {
	var components = path.split('/')
	return get('files/root')
		.then(root => components
			.map(x => x.toLocaleLowerCase())
			.map(nextName => item=>get(`files?q='${item.id}' in parents`)
				.then(res => res.items.find(item => item.title.toLocaleLowerCase() == nextName))
			)
			.reduce((p, fn) => p.then(fn), Promise.resolve(root))
		)
		.then(item => {
			if(item) return item
			throw new Error('404: ' + path)
		})
}
