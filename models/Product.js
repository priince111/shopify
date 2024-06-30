const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title : {
            required : true,
            type : String
        },

        description : {
            required : true,
            type: String,
        },

        category : {
            required : true,
            type: String,
        },

        price : {
            required : true,
            type : Number
        },

        date_added : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model('product',ProductSchema);