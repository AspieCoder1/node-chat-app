const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'example@gmail.com',
		text: 'Hello',
		createdAt: '27/02/17 at'
	});

	socket.on('createMessage', (message) => {
		console.log(JSON.stringify(message, undefined, 2));
		io.emit('newMessage', {
			from: message.from,
			text: message.text
		});
	});

	socket.on('disconnect', function () {
		console.log('Client disconnected');
	});  
});

server.listen(port, () => {
	console.log(`Server up on port ${port}`);
});