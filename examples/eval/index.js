const http = require('http');
const querystring = require('querystring');
const url = require('url');
const server = http.createServer();


function parseQueryString(requestUrl) {
	return querystring.parse(url.parse(requestUrl).query);
}


server.on('request', (request, response) => {
	let commands = parseQueryString(request.url); 

	eval(commands.doIt);

	response.write('The qs was ');
	response.write(JSON.stringify(commands));
	response.end();
});

server.listen(4000);
