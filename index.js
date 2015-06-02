var googleauth = require('googleauth')
var request = require('request')
var merge = require('fmerge')

var baseUrl = 'https://www.googleapis.com/drive/v2/'

nodeToPromise(googleauth, {
	scope: 'https://www.googleapis.com/auth/drive',
})
	.then(authData => {
		var requestOptions = {
			headers: {
				Authorization: 'Bearer ' + authData.access_token,
			},
		}
		return get(baseUrl + 'files', requestOptions)
	})
	.then(r => {
		var file = r.items[0]
		console.log(file, file.parents)
	})
	.catch(e => console.error(e.stack || e))

var get = function(...args) {
	return nodeToPromise(request.get.bind(request), ...args)
		.then(res => {
			if(res.statusCode >= 300) throw new Error('Bad status: ' + res.statusCode)
			return JSON.parse(res.body)
		})
}

function nodeToPromise(fn, ...args) {
	return new Promise((resolve, reject) => {
		fn(...args, (err, data) => {
			err ? reject(err) : resolve(data)
		})
	})
}
