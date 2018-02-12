const expect = require('expect');
const {isRealString} = require('./validate');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		expect(isRealString(7)).toBeFalsy();
	});
	it('should reject string with only spaces', () => {
		expect(isRealString('    ')).toBeFalsy();    
	});
	it('should allow string with non-space characters', () => {
		expect(isRealString('  LOTR  ')).toBeTruthy();
	});
});