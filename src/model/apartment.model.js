const mongoose = require('mongoose')
const {Schema} = mongoose
const uuid = require('uuid')

const apartmentSchema = Schema({
    numApp:{
        type:String,
        default: function () {
            return uuid.v4();
        },
    },
    design:{
        type:String,
    },
    rent:{
        type:Number
    }
})


module.exports = mongoose.model('apartment',apartmentSchema)