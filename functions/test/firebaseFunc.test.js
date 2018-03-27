const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const UserGet = require('../funTest/UserGet')
const UserDelete = require('../funTest/UserDelete')
const UserPost = require('../funTest/UserPost')
const UserPut = require('../funTest/UserPut')

const FoodPost = require('../funTest/FoodPost')
const FoodPut = require('../funTest/FoodPut')
const FoodGet = require('../funTest/UserGet')
const FoodDelete = require('../funTest/FoodDelete')


const admin = require('firebase');
admin.initializeApp({
    apiKey: "AIzaSyB4OhDAClL7zuJXqRBqKEuw76xj1JVBan0",
    authDomain: "nu-ker-fox.firebaseapp.com",
    databaseURL: "https://nu-ker-fox.firebaseio.com",
    projectId: "nu-ker-fox",
    storageBucket: "nu-ker-fox.appspot.com",
    messagingSenderId: "174374570388"
})

let inputUser = {
    uid:"123456",
	name: 'Testing Create field',	
	email: 'Testing Create field',
	height: 170,
	weight: 50,
	age: 25,
	sex: 'male',
	status: true,	
    activity: 1.2,
    photoUrl: "sample"
};
let inputFood = {
    uid: "123456" ,
    id:"1234",
	name: 'Testing Create field',
    calories: 12,
    total_fat:12,
    saturated_fat:212,
    cholesterol:21,
    total_carbohydrate:21,
    sugars:12,
    protein:21,
    photoUrl: "sample"
};
describe('Function Success', () => {
    it('should generate a generic application response Post User', (done) => {
        UserPost(admin,'POST', inputUser ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Post Food', (done) => {
        FoodPost(admin,'POST', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Put Food', (done) => {
        FoodPut(admin,'PUT', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Delete Food', (done) => {
        FoodDelete(admin,'DELETE', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Put User', (done) => {
        UserPut(admin,'POST', inputUser ,(data)=>{
            expect(data).should.be.an('object')
            expect(typeof(data.calories)).to.eql('number')
            done()
        })
    })
    it('should generate a generic application response Get By Id User', (done) => {
        UserGet(admin,'GET', inputUser.uid ,(data)=>{
            expect(data).should.be.an('object')
            expect(typeof(data.calories)).to.eql('number')
            done()
        })
    })
    it('should generate a generic application response destroy By Id User', (done) => {
        UserDelete(admin,'DELETE', inputUser.uid ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
})

describe('Function Error', () => {
    it('should generate a generic application response Error Post User', (done) => {
        UserPost(admin,'POST', inputUser ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Error Post Food', (done) => {
        FoodPost(admin,'POST', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Error Put Food', (done) => {
        FoodPut(admin,'PUT', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Error Delete Food', (done) => {
        FoodDelete(admin,'DELETE', inputFood ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
    it('should generate a generic application response Error Put User', (done) => {
        UserPut(admin,'POST', inputUser ,(data)=>{
            expect(data).should.be.an('object')
            expect(typeof(data.calories)).to.eql('number')
            done()
        })
    })
    it('should generate a generic application response Error Get By Id User', (done) => {
        UserGet(admin,'GET', inputUser.uid ,(data)=>{
            expect(data).should.be.an('object')
            expect(typeof(data.calories)).to.eql('number')
            done()
        })
    })
    it('should generate a generic application response Error destroy By Id User', (done) => {
        UserDelete(admin,'DELETE', inputUser.uid ,(data)=>{
            expect(data).should.be.an('object')
            done()
        })
    })
})