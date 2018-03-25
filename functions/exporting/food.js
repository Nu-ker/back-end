module.exports = (functions, admin, Users, moment )=>{
    return functions.https.onRequest((req, res) => {
        if(req.method === 'POST'){
            Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods').push({
                name: req.body.name,
                calories: req.body.calories,
                total_fat:req.body.total_fat,
                saturated_fat:req.body.saturated_fat,
                cholesterol:req.body.cholesterol,
                total_carbohydrate:req.body.total_carbohydrate,
                sugars:req.body.sugars,
                protein:req.body.protein,
                photoUrl:req.body.photoUrl
            })
            return Users.child(req.headers['uid']).once('value',snapshot=>{
                console.log(snapshot.val().dates[moment().format('MMMM-DD-YYYY')]['calories']);
                Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).update({
                    calories: Number(snapshot.val().dates[moment().format('MMMM-DD-YYYY')]['calories']) - Number(req.body.calories)
                })
                res.send({
                    msg: "POST SUCCESS"
                })
            })
        }else if(req.method === 'PUT') {
            return Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods/'+req.headers['foodid']).on('value',snapshotFood=>{
                return Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).once('value',snapshot=>{
                    Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).update({
                        calories: ((Number(snapshot.val()['calories'])+ snapshotFood.val()['calories']) - Number(req.body.calories))
                    })
                    Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods/'+req.headers['foodid']).update({
                        name: req.body.name,
                        calories: req.body.calories,
                        total_fat:req.body.total_fat,
                        saturated_fat:req.body.saturated_fat,
                        cholesterol:req.body.cholesterol,
                        total_carbohydrate:req.body.total_carbohydrate,
                        sugars:req.body.sugars,
                        protein:req.body.protein,
                        photoUrl:req.body.photoUrl
                    })
                    res.send({
                        msg: "POST SUCCESS"
                    })
                })
            })
        }else if(req.method === 'DELETE'){
            console.log('sample', req.headers);
            return Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).once('value',snapshot=>{
                Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).update({
                    calories: Number(snapshot.val()['calories']) + Number(snapshot.val().foods[req.headers.foodid].calories)
                })
                Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods/'+req.headers['foodid']).remove()
                return res.send({
                    msg: 'SUCCESS DELETE'
                })
            })
        }else if(req.method === 'GET'){
            if(req.params['0']){
                return Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods/'+req.headers['foodid']).on('value', snapshot=>{
                    res.send(snapshot.val())
                })
            }else{
                return Users.child(req.headers['uid']).child('dates/'+moment().format('MMMM-DD-YYYY')).on('value', snapshot=>{
                    res.send(snapshot.val())
                })
            }
        }else{
            res.send({
                msg: 'ERROR'
            })
        }
    })
}