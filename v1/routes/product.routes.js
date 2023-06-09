const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const productController = require("../../controllers/product.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/product")
    .get(productController.getProduct)
    .post(productController.addProduct);

  router.route("/product-paginate").get([paginator.pageable, productController.getProductPaginate, paginator.headers]);

  router
    .route("/product/:idProduct")
    .put(productController.editProduct)
    .delete(productController.deleteProduct);

  app.use(process.env.URI_API, router);
};
