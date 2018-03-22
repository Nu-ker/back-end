const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment')

admin.initializeApp(functions.config().firebase);
var Users = admin.database().ref('Users')

exports.helloWorld = functions.https.onRequest((req, res) => {
    res.json("Hello from Firebase!");
});

exports.UserLogin = functions.https.onRequest((req, res) => {
    Users.child(req.headers.uid).once('value',snapshot=>{
        if(snapshot.val()){
            return res.send({
                msg: 'AKUN ADA',
                value: snapshot.val(),
                status:true
            })
        }else{
            return res.send({
                msg:'AKUN TIDAK ADA',
                status:false
            })
        }
    })
});

exports.User = functions.https.onRequest((req, res) => {
    var calories = null
    if(req.method === 'POST'){
        if(req.body.sex==='male'){
            calories = Math.floor(66.4730 + (13.7516 * Number(req.body.weight)) + (5 * Number(req.body.height)) - (6.7550 * Number(req.body.age))* Number(req.body.activity))
        }else{
            calories =  Math.floor(655.0955 + (9.5634 * Number(req.body.weight)) + (1.8496 * Number(req.body.height)) - (4.6756 * Number(req.body.age)) * Number(req.body.activity))
        }
        Users.child(req.headers.uid).set({
            email:req.body.email,
            name: req.body.name,
            weight: req.body.weight,
            height: req.body.height,
            age: req.body.age,
            sex: req.body.sex,
            activity: req.body.activity,
            calories: calories,
            status: true
        })
        Users.child(req.headers.uid+'/dates/'+moment().format('DD-MM-YYYY')).set({
            calories:calories
        })
        res.send({
            msg: 'SUCCESS POST'
        })
    }else if(req.method === 'PUT') {
        if(req.body.sex==='male'){
            calories = Math.floor(66.4730 + (13.7516 * Number(req.body.weight)) + (5 * Number(req.body.height)) - (6.7550 * Number(req.body.age))* Number(req.body.activity))
        }else{
            calories =  Math.floor(655.0955 + (9.5634 * Number(req.body.weight)) + (1.8496 * Number(req.body.height)) - (4.6756 * Number(req.body.age)) * Number(req.body.activity))
        }
        admin.database().ref('Users/'+req.headers.uid).update({
            name: req.body.name,
            email: req.body.email,
            weight: req.body.weight,
            height: req.body.height,
            age: req.body.age,
            sex: req.body.sex,
            activity: req.body.activity,
            calories: calories,
            status: true
        })
        res.send({
            msg: 'SUCCESS PUT'
        })
    }else if(req.method === 'DELETE'){
        admin.database().ref('Users/'+req.headers.uid).remove()
        res.send({
            msg: 'SUCCESS DELETE'
        })
    }else if(req.method === 'GET'){
        if(req.headers.uid){
            return admin.database().ref('Users/'+req.headers.uid).on('value', snapshot=>{
                res.send({
                    key:snapshot.key,
                    value:snapshot.val()
                })
            })
        }else{
            return Users.on('value', snapshot=>{
                res.send(snapshot.val())
            })
        }
    }else{
        res.send({
            msg: 'METHOD NOT FOUND'
        })
    }
})
exports.DateCheck = functions.https.onRequest((req, res) => {
    return Users.child(req.headers['uid']).once('value',snapshot=>{
        if(!snapshot.val()['dates'][req.headers.date]){
            Users.child(req.headers['uid']).child('dates').child(req.headers.date).set({
                calories: snapshot.val()['calories'],
            })
        }
        return res.send({
            status: 'CHECK SUCCESS'
        })
    })
})

exports.Food = functions.https.onRequest((req, res) => {
    if(req.method === 'POST'){
        Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).child('foods').push({
            name: req.body.name,
            calories: req.body.calories,
            total_fat:req.body.total_fat,
            saturated_fat:req.body.saturated_fat,
            cholesterol:req.body.cholesterol,
            total_carbohydrate:req.body.total_carbohydrate,
            sugars:req.body.sugars,
            protein:req.body.protein,
            imgUrl:req.body.imgUrl
        })
        return User.child(req.headers['uid']).once('value',snapshot=>{
            User.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).update({
                calories: Number(snapshot.val()['calories']) - Number(req.body.calories)
            })
            res.send({
                msg: "POST SUCCESS"
            })
        })
    }else if(req.method === 'PUT') {
        return Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).child('foods/'+req.headers['foodid']).on('value',snapshotFood=>{
            return User.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).once('value',snapshot=>{
                User.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).update({
                    calories: ((Number(snapshot.val()['calories'])+ snapshotFood.val()['calories']) - Number(req.body.calories))
                })
                Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).child('foods/'+req.headers['foodid']).update({
                    name: req.body.name,
                    calories: req.body.calories,
                    total_fat:req.body.total_fat,
                    saturated_fat:req.body.saturated_fat,
                    cholesterol:req.body.cholesterol,
                    total_carbohydrate:req.body.total_carbohydrate,
                    sugars:req.body.sugars,
                    protein:req.body.protein,
                    imgUrl:req.body.imgUrl
                })
                res.send({
                    msg: "POST SUCCESS"
                })
            })
        })
    }else if(req.method === 'DELETE'){
        Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).child('foods/'+req.headers['foodid']).remove()
        res.send({
            msg: 'SUCCESS DELETE'
        })
    }else if(req.method === 'GET'){
        if(req.params['0']){
            return Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).child('foods/'+req.headers['foodid']).on('value', snapshot=>{
                res.send(snapshot.val())
            })
        }else{
            return Users.child(req.headers['uid']).child('dates/'+moment().format('DD-MM-YYYY')).on('value', snapshot=>{
                res.send(snapshot.val())
            })
        }
    }else{
        res.send({
            msg: 'ERROR'
        })
    }
})

