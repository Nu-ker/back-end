'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
const uid = '65e7cf5f'
describe('Get One Users API: GET', () => {	

	it('should generate a generic application response', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.get('/')
		.set('uid', `${uid}`)
		.end((err, response) => {
			if (err) {
				return done(err);
			}
			const appResponse = response.body;			
			expect(err).to.be.null;									
			expect(response.status).to.equal(200);  
			should.exist(appResponse);				
			done();
		});
	});

	it('should be object', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.get('/')
		.set('uid', `${uid}`)
		.end((err, response) => {
			if (err) {
				return done(err);
			}
			const appResponse = response.body;			
			expect(err).to.be.null;	
			appResponse.should.be.an('object');			
			appResponse.value.should.be.an('object');
			done();
		});
	});

	it('should have right property', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.get('/')
		.set('uid', `${uid}`)
		.end((err, response) => {
			if (err) {
				return done(err);
			}
			const appResponse = response.body;
			expect(err).to.be.null;												
			appResponse.value.should.have.property('activity');
			appResponse.value.should.have.property('age');
			appResponse.value.should.have.property('calories');
			// appResponse.value.should.have.property('dates');
			appResponse.value.should.have.property('email');
			appResponse.value.should.have.property('height');
			appResponse.value.should.have.property('name');
			appResponse.value.should.have.property('sex');
			appResponse.value.should.have.property('status');
			appResponse.value.should.have.property('weight');			
			done();
		});
	});

	it('response error wrong get user', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.get('/')
		.set('uid', `1234567`)
		.end((err, response) => {
			if (err) {
				return done(err);
			}									
			expect(err).to.be.null;	
			expect(response.status).to.equal(200);						
			done();
		});
	});

	it('response error value null', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.get('/')
		.set('uid', `1234567`)
		.end((err, response) => {
			if (err) {
				return done(err);
			}			
			const appResponse = response.body;		
			let result = Object.values(appResponse)			
			expect(err).to.be.null;	
			expect(response.status).to.equal(200);			
			expect(result[1]).to.be.null;	
			done();
		});
	});
	
		
});