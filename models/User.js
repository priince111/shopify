const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name : {
            required : true,
            type : String
        },

        email : {
            required : true,
            type: String,
            unique: true,
            lowercase: true,
            validate: [isEmail, 'please enter valid email'],
        },

        password : {
            required : true,
            type : String,
            minlength : [6,'minimum length of password should be 6']
        },

        register_date : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model('user',UserSchema);