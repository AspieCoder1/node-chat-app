var socket = io();

socket.on('connect', function () {
	console.log('Connected to server');
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('kk:mm');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('kk:mm');
	var template = jQuery('#location-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();
	var messageTextbox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	locationButton.attr('disabled', 'disabled').text('Send Location...');

	navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		locationButton.removeAttr('disabled').text('Send Location');
	}, function () {
		alert('Unable to fetch location');
		locationButton.removeAttr('disabled').text('Send Location');
	});
});