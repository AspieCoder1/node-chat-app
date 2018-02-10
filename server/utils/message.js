var generateMessage = (from, text) => {
	return {
		from,
		text,
		createdAt: new Date().getUTCDate()
	};
};

var generateLocationMessage = (from, lat, long) => {
	return {
		from,
		url: `https://www.google.com/maps?q=${lat},${long}`,
		createdAt: new Date().getUTCDate()
	};
};

module.exports = {generateMessage, generateLocationMessage};