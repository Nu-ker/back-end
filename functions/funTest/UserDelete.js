module.exports = (admin,method,id,cb)=>{
    if(method==="DELETE"){
        admin.database().ref('Users').child(id).set(null)
        return cb({
            msg : "DELETE SUCCESS"
        })
    }
}