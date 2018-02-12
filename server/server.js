const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {
	generateMessage,
	generateLocationMessage
} = require('./utils/message');
const {isRealString} = require('./utils/validate');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app'
	});

	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required');
		}

		socket.join(params.room);
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined chat`));
		callback();
	});

	socket.on('createMessage', function (message, callback) {
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('Message Recieved');
	});

	socket.on('createLocationMessage', function (coords) {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', function () {
		console.log('Client disconnected');
	});
});

server.listen(port, function () {
	console.log(`Server up on port ${port}`);
});