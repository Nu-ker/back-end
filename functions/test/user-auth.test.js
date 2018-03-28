'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

const uid = '65e7cf5';
const signin = {
	email: 'ariefmandracoms',	
};

describe('Get User Login API: GET', () => {	
	it('login success', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/UserLogin')		
		.get('/')
		.type('form')
		.set('uid', `${uid}`)		
		.send(signin)		
    .end(function (err, response) {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
    	expect(response.status).to.equal(400);              	
      done(err)
    })    
	});

	it('login fail', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/UserLogin')		
		.get('/')
		.type('form')
		.set('uid', `${uid}`)		
		.send(signin)		
    .end(function (err, response) {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
    	expect(response.status).to.equal(400);              	
      done(err)
    })    
	});

});

