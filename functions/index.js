const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment')
const Expuser = require('./exporting/user')
const Expfood = require('./exporting/food')
const ExpdateCheck = require('./exporting/dateCheck')
const ExpuserLogin = require('./exporting/userLogin')
admin.initializeApp(functions.config().firebase);
var Users = admin.database().ref('Users')
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.json("Hello from Firebase!");
});
exports.UserLogin = ExpuserLogin(functions, admin, Users, moment)
exports.User = Expuser(functions, admin, Users, moment)
exports.DateCheck = ExpdateCheck(functions, admin, Users, moment)
exports.Food = Expfood(functions, admin, Users, moment)
//GRAPHQL

const app = express();
const schema = buildSchema(`
  type Error {
      key: String
      msg: String
  }
  type Query {
    error: [Error]
  }
  type Mutation {
    errorPost(err: String): String
  }
`);
var arr = []
var root = {
  error:() => {
    return arr
  },
  errorPost:(err)=>{
    let key = admin.database().ref('error').push().key
    arr.push({
        key: String(key),
        msg: String(err) 
    })
    return admin.database().ref('error').child(key).set(err)
  }
};

app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

exports.graphql = functions.https.onRequest(app)