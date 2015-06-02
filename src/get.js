var request = require('request')
var authedRequest

var baseUrl = 'https://www.googleapis.com/drive/v2/'

module.exports = function(url, opts = {}) {
	return new Promise(function(resolve, reject) {
		authedRequest.get(baseUrl + url, opts, function(err, res) {
			err ? reject(err) : resolve(res)
		})
	})
		.then(function(res) {
			if(res.statusCode >= 300) throw new Error('Bad status: ' + res.statusCode)
			return JSON.parse(res.body)
		})
}

module.exports.config = authData => {
	authedRequest = request.defaults({
		headers: {
			Authorization: 'Bearer ' + authData.access_token,
		},
	})
}
