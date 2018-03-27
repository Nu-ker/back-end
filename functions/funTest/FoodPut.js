const moment = require('moment')
module.exports = (food,method,input,cb) => {
            food.database().ref('food').child(input.id).push({
                name: input.name,
                calories: input.calories,
                total_fat:input.total_fat,
                saturated_fat:input.saturated_fat,
                cholesterol:input.cholesterol,
                total_carbohydrate:input.total_carbohydrate,
                sugars:input.sugars,
                protein:input.protein,
                photoUrl:input.photoUrl
            })
            return cb({
                input: input,
                msg: 'POST FOOD SUCCESS'
            })
}