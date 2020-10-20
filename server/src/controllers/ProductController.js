const { Product } = require('../models')
module.exports = {
    // get all product
    async index(req, res) {
        try {
            const products = await Product.findAll()
            res.send(products)
        } catch (err) {
            res.status(500).send({
                error: 'The comments information was incorrect'
            })
        }
    },
    // create comment
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            const product = await Product.create(req.body)
            res.send(product.toJSON())
        } catch (err) {
            res.status(500).send({
                error: 'Create product incorrect'
            })
        }
    },
    // edit product, suspend, active
    async put(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.productId
                }
            })
            res.send(req.body)
        } catch (err) {
            216
            req.status(500).send({
                error: 'Update product incorrect'
            })
        }
    },
    // delete product
    async remove(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    id: req.params.productId
                }
            })
            if (!product) {
                return res.status(403).send({
                    error: 'The product information was incorrect'
                })
            }
            await product.destroy()
            res.send(product)
        } catch (err) {
            req.status(500).send({
                error: 'The product information was incorrect'
            })
        }
    },
    // get product by id
    async show(req, res) {
        try {
            const product = await Product.findById(req.params.productId)
            res.send(product)
        } catch (err) {
            req.status(500).send({
                error: 'The product information was incorrect'
            })
        }
    }
}