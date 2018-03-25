module.exports = (functions, admin, Users, moment )=>{
    return functions.https.onRequest((req, res) => {
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
}