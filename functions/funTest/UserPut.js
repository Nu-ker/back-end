const moment = require('moment')
module.exports = (admin,method,input,cb) => {
    var calories = null
    if(method==="POST"){
        if(input.sex==='male'){
            calories = Math.floor(66.4730 + (13.7516 * Number(input.weight)) + (5 * Number(input.height)) - (6.7550 * Number(input.age))* Number(input.activity))
        }else{
            calories =  Math.floor(655.0955 + (9.5634 * Number(input.weight)) + (1.8496 * Number(input.height)) - (4.6756 * Number(input.age)) * Number(input.activity))
        }
        admin.database().ref('Users').child(input.uid).set({
            email:input.email,
            name: input.name,
            photoUrl: input.photoUrl,
            weight: input.weight,
            height: input.height,
            age: input.age,
            sex: input.sex,
            activity: input.activity,
            calories: calories,
            status: true
        })
        admin.database().ref('Users').child(input.uid+'/dates/'+moment().format('MMMM-DD-YYYY')).set({
            calories:calories
        })
        return cb({
            msg:'success',
            calories,
        })   
    }
}