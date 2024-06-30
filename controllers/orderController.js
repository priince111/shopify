const Cart = require('../models/Cart');
const User = require('../models/User');
const config = require('config');
const Order = require('../models/Order');
const stripe = require('stripe')(config.get('StripeAPIKey'));

const get_orders = async(req,res) => {
    const userId = req.params.id;
    console.log("userid in get order",userId);
    Order.find({userId}).sort({date:-1}).then(orders => res.json(orders));
}

const checkout = async(req,res) => {
    const userId = req.params.id;
    console.log("body in checkout",req.body);
    const {source} = req.body;
    console.log("source", source);

    try{
        let cart = await Cart.findOne({userId});
        let user = await User.findOne({_id : userId});
        console.log("cart in checout", cart);
        console.log("user in checout", user);
        const email = user.email;
        if(cart){
            const charge = await stripe.charges.create({
                amount: cart.bill*100,
                currency: 'inr',
                source,
            })
            console.log("charge in checout",charge)
            if(!charge) throw error('Payment Failed');
            if(charge){
                const order = await Order.create({
                    userId,
                    bill : cart.bill,
                    products : cart.products
                });
            
                const data = await Cart.findByIdAndDelete({_id : cart.id});
                res.status(201).send(order);
            }

        }
        else{
            res.status(500).send('Your cart is empty');
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send('Something went wrong in payment');
    }

}

module.exports = {get_orders,checkout};