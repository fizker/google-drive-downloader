var googleauth = require('googleauth')
var request = require('request')

var get = require('./src/get')

nodeToPromise(googleauth, {
	client_id: process.env.GOOGLEAUTH_CLIENT,
	client_secret: process.env.GOOGLEAUTH_SECRET,
	scope: 'https://www.googleapis.com/auth/drive',
	refresh: true,
	configName: 'update-from-drive'
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
