const productsServices = require("../services/product.services")


exports.getProducts = async (req, res, next) => {
    try {
        const products = await productsServices.getProductsService();

        res.status(200).json({
            status: 'success',
            message: "Successfully found",
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't get the data",
            error: error.message
        })
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        const result = await productsServices.createProductService(req.body);
        // result.logger();

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Operation failed.',
            error: error.message
        })
    }
}