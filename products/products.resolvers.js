const productsModel = require('./products.model');

module.exports = {
    Query: {
        products: (parent) => {
            return parent.products;
        },
        productsByPrice: (_, args) => {
            return productsModel.getProductsByPrice(args.min, args.max)
        },
        product: (_, args) => {
            return productsModel.getProductByIs(args.id);
        }
    }, 
    Mutation: {
        addNewProduct: (_, args) => {
            return productsModel.addNewProduct(args.id, args.description, args.price);
        },
        addNewProductReview: (_, args) => {
            return productsModel.addNewProductReview(args.id, args.rating, args.comment);
        }
    }
}