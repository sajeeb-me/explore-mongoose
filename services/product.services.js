const Product = require("../models/Product");


exports.getProductsService = async () => {
    const products = await Product.find({});
    // const products = await Product.find({ name: { $in: ['Chal', 'Dal'] } });
    // const products = await Product.find({}, '-_id name',);
    // const products = await Product.find({}).sort({ quantity: 1 });
    // const products = await Product
    //     .where('name').equals(/\w/)
    //     .where('quantity').gte(100)
    //     .sort({ quantity: 1 })
    //     .limit(2);
    // const product = await Product.findById('632405d7ef2eaf34125dd448')

    return products;
}

exports.createProductService = async (data) => {
    // there are 2 ways to post data
    // 1. Save
    // 2. Create

    // create method
    const result = await Product.create(data);

    // save method  (instance creation > do something > save())
    // const product = new Product(data);
    // if (product.quantity === 0) {
    //     product.status = 'out-of-stock'
    // }
    // const result = await product.save();
    return result;
}