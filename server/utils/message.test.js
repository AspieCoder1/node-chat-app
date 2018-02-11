const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js'); 

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var res = generateMessage('Mike', 'Hello');
		expect(res).toMatchObject({from: 'Mike', text: 'Hello'});
		expect(typeof res.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct message object', () => {
		var res = generateLocationMessage('Mike', '53.4049529', '-2.3700189');
		expect(res).toMatchObject({from: 'Mike', url: 'https://www.google.com/maps?q=53.4049529,-2.3700189'});
		expect(typeof res.createdAt).toBe('number');
	});
});