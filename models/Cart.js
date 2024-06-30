const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        userId :{
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        products :[{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            quantity: {
                required: true,
                type: Number,
                min: [1, `Quantity can't be less than 1`],
                default: 1
            },
            price: Number
        }],
        bill: {
            required: true,
            type: Number,
            default: 0
        }
    }
)

module.exports = mongoose.model('cart',CartSchema)