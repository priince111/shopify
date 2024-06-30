const Product = require('../models/Product');

const get_products = (req,res) => {
    console.log("all the products are here")
    Product.find().sort({date:-1}).then(products => {res.json(products)});
}

const post_product = (req,res) => {
    console.log("we post the products are here")
    const newProduct = new Product(req.body);
    newProduct.save().then(product =>{res.json(product)});
}

const update_product = async (req,res) => {
    const updatedProduct = await Product.findByIdAndUpdate({id:req.params.id},req.body);
    const product = Product.findOne({id:req.params.id});
    res.json(product);
}

const delete_product = async (req,res) => {
    const product = await Product.findByIdAndRemove({id:req.params.id},req.body);
    if(product) res.json({success:true});
    res.status(404).json({msg : 'product not found'});
}

module.exports = {get_products,post_product,update_product,delete_product};