module.exports = (admin,method,id,cb)=>{
    if(method==="GET"){
        admin.database().ref('Users').child(id).once('value',snapshot=>{
            cb(snapshot.val())
        })
    }
}