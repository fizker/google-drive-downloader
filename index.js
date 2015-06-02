var googleauth = require('googleauth')
var request = require('request')

var pathToFind = process.argv[2]
if(!pathToFind) {
	console.error('Pass path-to-find as first param')
	process.exit(1)
}

var get = require('./src/get')
var findItem = require('./src/find-item')

nodeToPromise(googleauth, {
	client_id: process.env.GOOGLEAUTH_CLIENT,
	client_secret: process.env.GOOGLEAUTH_SECRET,
	scope: 'https://www.googleapis.com/auth/drive',
	refresh: true,
	configName: 'update-from-drive'
})
	.then(authData => {
		get.config(authData)
		return findItem(pathToFind)
	})
	.then(file => {
		console.log(file)
	})
	.catch(e => console.error(e.stack || e))

function nodeToPromise(fn, ...args) {
	return new Promise((resolve, reject) => {
		fn(...args, (err, data) => {
			err ? reject(err) : resolve(data)
		})
	})
}
