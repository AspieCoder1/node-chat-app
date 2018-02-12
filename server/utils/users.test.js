const expect = require('expect');
const {
	Users
} = require('./users.js');

describe('Users', () => {
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Jen',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Julie',
			room: 'Node Course'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: 123,
			name: 'Luke',
			room: 'The office fans'
		};
		users.addUser(user.id, user.name, user.room);
		expect(users.users).toMatchObject([user]);
		expect(users.users.length).toBe(1);
	});
	it('should return names for node course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Mike', 'Julie']);
	});
	it('should return names for react course', () => {
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Jen']);
	});
	it('should remove user', () => {
		var userID = '1';
		var user = users.removeUser(userID);
		expect(user.id).toBe(userID);
		expect(users.users.length).toBe(2);
	});
	it('should not remove user', () => {
		var userList = users.removeUser('56');
		expect(userList).toBeFalsy();
		expect(users.users.length).toBe(3);
	});
	it('should find user', () => {
		var user = users.getUser('1');
		expect(user).toEqual({
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		});
	});
	it('should not find user', () => {
		var user = users.getUser('129');
		expect(user).toBeFalsy();
	});
});