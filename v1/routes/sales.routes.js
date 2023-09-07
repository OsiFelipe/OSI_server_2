const express = require("express");
const paginator = require("../../middlewares/paginator");
const salesController = require("../../controllers/sales.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/sales")
    .get(verificaToken, verifyRole([0, 1, 2]), salesController.getSales)
    .post(verificaToken, verifyRole([0, 1]), salesController.addSales);

  router
    .route("/sales-paginate")
    .get(verificaToken, verifyRole([0, 1, 2]), [
      paginator.pageable,
      salesController.getSalesPaginate,
      paginator.headers,
    ]);

  router
    .route("/sales/:idSales")
    .get(verificaToken, verifyRole([0, 1, 2]), salesController.getSaleById)
    .put(verificaToken, verifyRole([0, 1]), salesController.editSales);

  app.use(process.env.URI_API, router);
};
