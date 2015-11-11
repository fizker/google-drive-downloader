'use strict'

var currentTimeZone = (function() {
	var tz = (new Date().getTimezoneOffset()/60).toString()

	var prefix = '', hours = '00', minutes = '00'
	if(tz[0] == '-') {
		prefix = '-'
		tz = tz.substring(1)
	}
	var s = tz.split('.')
	hours = ('00' + s).substr(-2)
	if(s[1]) {
		minutes = ('00' + s[1]).substr(-2)
	}

	var timezone = prefix + hours + ':' + minutes
	return timezone == '00:00' ? 'Z' : timezone
})()

module.exports = function(input) {
	if(!input) return null
	var match = input.match(/^(\d{4}-\d{2}-\d{2})(?:T(\d{2}:\d{2}(?::\d{2})?))?(?:\.\d+)?(Z|[+-]\d{2}:\d{2})?$/)
	if(match == null) return null

	//let [ , date, time, timezone ] = match
	let date = match[1]
	let time = match[2]
	let timezone = match[3]

	if(!time) time = '00:00:00'
	if(time.length == 5) time += ':00'
	if(!timezone) timezone = currentTimeZone
	return date + 'T' + time + timezone
}
