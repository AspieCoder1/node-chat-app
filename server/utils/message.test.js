const expect = require('expect');
var {generateMessage} = require('./message.js'); 

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var res = generateMessage('Mike', 'Hello');
		expect(res).toMatchObject({from: 'Mike', text: 'Hello'});
	});
});