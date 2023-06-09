const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const salesController = require("../../controllers/sales.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/sales")
    .get(salesController.getSales)
    .post(salesController.addSales);

  router.route("/sales-paginate").get([paginator.pageable, salesController.getSalesPaginate, paginator.headers]);

  router
    .route("/sales/:idSales")
    .get(salesController.getSaleById)
    .put(salesController.editSales);

  app.use(process.env.URI_API, router);
};
