const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer();


server.on('request', (request, response) => {
	
	let buffer = new Buffer(120);
	fs.readFile('foo.txt', (err, data) => {
		if(!err) {
			const buffer = data;
		}
	});

	response.write(buffer);
  response.end();
});

server.listen(4000);
