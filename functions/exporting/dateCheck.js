module.exports = (functions, admin, Users, moment )=>{
    return functions.https.onRequest((req, res) => {
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
}