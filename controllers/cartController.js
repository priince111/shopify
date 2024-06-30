const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const get_cart_items = async(req,res) =>{
    const userId = req.params.id;
    try{
        const cart = await Cart.findOne({userId});
        console.log("cart in get_cart",cart)
        if(cart && cart.products.length > 0){
            res.send(cart);
        }
        else
            return {};
    }
    catch(err){
        console.log(err);
        res.status(500).send('Something Went Wrong');
    }
}

const add_cart_item = async(req,res) => {
    const userId = req.params.id;
    console.log("user id",userId);
    //fetch product id and quantity from body
    console.log("body",req.body)
    const {productId, quantity} = req.body;
    console.log("hi productId",productId)
    try{
        let cart = await Cart.findOne({userId});
        console.log("cart", cart)
        let product = await Product.findOne({_id : productId});
        console.log("product is",product)
        if(!product)
            res.status(404).send('Something went wrong');

        const price = product.price;
        const name = product.title;
        console.log("name",name);
        console.log("price",price)
        //if user have the cart then we will check if user has this product in the cart
        if(cart){
            const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
            console.log("product ndex in add cart", productIndex);
            if(productIndex > -1){
                cart.products[productIndex].quantity += quantity;
            }
            else{
                cart.products.push({productId,name,quantity,price});
            }

            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }

        else{
            const newCart = await Cart.create({
                userId,
                products : [{productId,name,quantity,price}],
                bill : quantity*price
            });
            return res.status(201).send(cart);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong in adding item");
    }
}

const delete_cart_item = async(req,res) => {
    const userId = req.params.userId;
    console.log("user id in delete cart",userId)
    const productId = req.params.productId;
    console.log("product id in delete cart",productId)
    try{
        let cart = await Cart.findOne({userId});
        console.log("cart for delete_car_items",cart)
        let productIndex = cart.products.findIndex(p => p.productId == productId);
        console.log("productIndex",productIndex)
        if(productIndex>-1){
            let productItem = cart.products[productIndex];
            const price = productItem.price;
            const quantity = productItem.quantity;
            cart.bill -= price*quantity;
            cart.products.splice(productIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong in removing item");
    }
}

module.exports = {get_cart_items, add_cart_item,delete_cart_item}