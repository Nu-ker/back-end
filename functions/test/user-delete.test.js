'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const uid = '65e7cf5'

describe('Delete User API: DEL', () => {	
	it('delete success', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')		
		.del('/')
		.set('uid', `${uid}`)		
    .end(function (err, response) {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
    	expect(response.status).to.equal(200);              	
      done(err)
    })    
	});

	it('delete fail', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')		
		.del('/')
		.set('uid', `${uid}`)		
    .end(function (err, response) {
			if (err) {
				return done(err);
			}
			expect(err).to.be.null;
    	expect(response.status).to.equal(200);              	
      done(err)
    })    
	});
});

