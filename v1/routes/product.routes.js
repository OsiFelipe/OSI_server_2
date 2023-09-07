const express = require("express");
const paginator = require("../../middlewares/paginator");
const productController = require("../../controllers/product.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/product")
    .get(verificaToken, verifyRole([0, 1, 2, 3]), productController.getProduct)
    .post(verificaToken, verifyRole([0, 1]), productController.addProduct);

  router
    .route("/product-paginate")
    .get(verificaToken, verifyRole([0, 1, 2, 3]), [
      paginator.pageable,
      productController.getProductPaginate,
      paginator.headers,
    ]);

  router
    .route("/product/:idProduct")
    .put(verificaToken, verifyRole([0, 1]), productController.editProduct)
    .delete(verificaToken, verifyRole([0, 1]), productController.deleteProduct);

  app.use(process.env.URI_API, router);
};
