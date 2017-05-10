const http = require('http');
const querystring = require('querystring');
const url = require('url');
const server = http.createServer();

function parseQueryString(requestUrl) {
	return querystring.parse(url.parse(requestUrl).query);
}


server.on('request', (request, response) => {
	let qs = parseQueryString(request.url); 
	const unparsed_salary = qs.desiredSalary;
	if(unparsed_salary) {
	const matches = unparsed_salary.match(/[1-9]((,\d{3})|(\d)+)+(\.00)/);
	const message = matches ? `desired salary is $${matches[0]}` : 'invalid input';
	response.write(message);
	}
  response.end();
});

server.listen(4000);
