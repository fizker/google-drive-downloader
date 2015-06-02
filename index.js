var googleauth = require('googleauth')
var request = require('request')

var get = require('./src/get')

nodeToPromise(googleauth, {
	scope: 'https://www.googleapis.com/auth/drive',
})
	.then(authData => {
		get.config(authData)
		return get('files')
	})
	.then(r => {
		var file = r.items[0]
		console.log(file, file.parents)
	})
	.catch(e => console.error(e.stack || e))

function nodeToPromise(fn, ...args) {
	return new Promise((resolve, reject) => {
		fn(...args, (err, data) => {
			err ? reject(err) : resolve(data)
		})
	})
}
