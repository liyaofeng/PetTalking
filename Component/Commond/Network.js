import QueryString from 'query-string';
import Lodash from 'lodash';
import Mock from 'mockjs';

const baseUrl = 'http://rapapi.org/mockjs/23160/';

export var RequestUrl = {
	videoList: 'api/videoList'
};

var request = {};
export default request;

request.get = function(url, params) {
	var fullUrl = baseUrl + url
	if (params) {
		fullUrl += '?' + QueryString.stringify(params)
	}

	return fetch(fullUrl)
		.then((response) => response.json())
		.then((response) => Mock.mock(response))
}

request.post = function(url, body) {
	var fullUrl = baseUrl + url

	var config = {
		method: 'POST',
		headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json',
    	}
	};
	var options = Lodash.extend(config, {
		body: JSON.stringify(body)
	});

	return fetch(fullUrl, options)
		.then((response) => response.json())
		.then((response) => Mock.mock(response))
}