const http = require('http');
const querystring = require('querystring');
const url = require('url');
const server = http.createServer();
const exec = require('child_process').exec;

function parseQueryString(requestUrl) {
	return querystring.parse(url.parse(requestUrl).query);
}


server.on('request', (request, response) => {
	let qs = parseQueryString(request.url); 

	exec('ls -l ' + qs.path, (err, stdout, stderr) => {
		if(err) {
			response.write(stderr);
		} else {
			response.write(stdout);
		}
		response.end();
	});

});

server.listen(4000);
