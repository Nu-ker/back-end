'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

let inputFood = {
	calories: 22,	
	total_fat: 20,
	saturated_fat: 170,
	cholesterol: 50,
	sugars: 25,
	total_carbohydrate: 25,
	protein: 21,
	photoUrl: "https://uangteman.com/blog/wp-content/uploads/2017/06/franchise-ayam-gepuk.jpg",	
	name: 'Ayam gepuk',
};

const uid = "108402433316163576727"

describe('Create Food API: POST', () => {	

	it('create success', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/Food')
		.post('/')
		.set('uid', `${uid}`)
		.type('form')
		.send(inputFood)
		.end((err, response) => {
				expect(response.status).to.equal(500);
				expect(err).to.be.null;
				done();
			})
	});

	it('create fail', (done) => {
		chai.request('https://us-central1-nu-ker-fox.cloudfunctions.net/User')
		.post('/')
		.set('uid', '00001')
		.type('form')
		.send(inputFood)
		.end((err, response) => {
				expect(response.status).to.equal(500);
				expect(err).to.be.null;
				done();
			})
	});
});

