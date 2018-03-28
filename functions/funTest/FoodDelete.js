const moment = require('moment')
module.exports = (admin,method,input,cb)=>{
    if(method==="DELETE"){
        admin.database().ref('Users').child(input.uid).child('dates/'+moment().format('MMMM-DD-YYYY')).child('foods').child(input.id).set(null)
        return cb({
            msg : "DELETE SUCCESS"
        })
    }
}