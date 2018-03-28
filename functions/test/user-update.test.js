'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
const uid = '65e7cf5f';
const updateUser = {
	name: 'Testing Create field',	
	email: 'Testing Create field',
	height: 170,
	weight: 50,
	age: 25,
	sex: 'male',
	status: true,	
	activity: 1.2,	
};

describe('Update User API: PUT', () => {	
	it('update success', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.put('/')
		.set('uid', `${uid}`)
		.type('form')
		.send(updateUser)
		.end((err, response) => {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
			expect(response.status).to.equal(200);          				
			
			done();
		})
	});

	it('update fail', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.put('/')
		.set('uid', `wrongUid`)
		.type('form')
		.send(updateUser)
		.end((err, response) => {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
			expect(response.status).to.equal(200);          				
			
			done();
		})
	});

});

