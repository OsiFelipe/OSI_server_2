const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const clientController = require("../../controllers/client.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/client")
    .get([paginator.pageable, clientController.getClient, paginator.headers])
    .post(clientController.addClient);

  router.route("/client-paginate").get([paginator.pageable, clientController.getClientPaginate, paginator.headers]);

  router
    .route("/client/:idClient")
    .put(clientController.editClient)
    .delete(clientController.deleteClient);

  router
  .route("/client-detail/:idClient")
  .get(clientController.getClientDetail);
  
  app.use(process.env.URI_API, router);
};
