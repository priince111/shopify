const { numberParser } = require('config/parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userId: {
            required : true,
            ref : 'User',
            type : Schema.Types.ObjectId
        },
        products : [
            {
                productId : {
                    type : Schema.Types.ObjectId,
                    ref : 'Product'
                },
                name : String,
                quantity : {
                    type : Number,
                    required : true,
                    minimum : [1,'quantity can not be less than 1']
                },
                price : Number
            }
        ],
        bill : {
            required : true,
            type : Number
        },
        date_added : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model('order',OrderSchema);