module.exports = (functions, admin, Users, moment )=>{
    return functions.https.onRequest((req, res) => {
        var calories = null
        console.log(req)
        if(req.method === 'POST'){
            console.log(req.body)
            if(req.body.sex==='male'){
                calories = Math.floor(66.4730 + (13.7516 * Number(req.body.weight)) + (5 * Number(req.body.height)) - (6.7550 * Number(req.body.age))* Number(req.body.activity))
            }else{
                calories =  Math.floor(655.0955 + (9.5634 * Number(req.body.weight)) + (1.8496 * Number(req.body.height)) - (4.6756 * Number(req.body.age)) * Number(req.body.activity))
            }
            console.log(calories)
            Users.child(req.headers.uid).set({
                email:req.body.email,
                name: req.body.name,
                photoUrl: req.body.photoUrl,
                weight: req.body.weight,
                height: req.body.height,
                age: req.body.age,
                sex: req.body.sex,
                activity: req.body.activity,
                calories: calories,
                status: true
            })
            Users.child(req.headers.uid+'/dates/'+moment().format('MMMM-DD-YYYY')).set({
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
}