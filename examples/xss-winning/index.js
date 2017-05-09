const http = require('http');
const querystring = require('querystring');
const url = require('url');
const server = http.createServer();

function parseQueryString(requestUrl) {
	return querystring.parse(url.parse(requestUrl).query);
}


server.on('request', (request, response) => {
  let qs = parseQueryString(request.url); 
  
  response.write('<html><body>');
  response.write(`you asked for ${qs.searchTerm}`);
  response.write('</body></html>');
  response.end();
});

server.listen(4000);
