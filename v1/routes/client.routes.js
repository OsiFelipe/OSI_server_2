const express = require("express");
const paginator = require("../../middlewares/paginator");
const clientController = require("../../controllers/client.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/client")
    .get(verificaToken, verifyRole([0, 1, 2]), [
      paginator.pageable,
      clientController.getClient,
      paginator.headers,
    ])
    .post(verificaToken, verifyRole([0, 1, 2]), clientController.addClient);

  router
    .route("/client-paginate")
    .get(verificaToken, verifyRole([0, 1, 2]), [
      paginator.pageable,
      clientController.getClientPaginate,
      paginator.headers,
    ]);

  router
    .route("/client/:idClient")
    .put(verificaToken, verifyRole([0, 1, 2]), clientController.editClient)
    .delete(verificaToken, verifyRole([0, 1]), clientController.deleteClient);

  router
    .route("/client-detail/:idClient")
    .get(
      verificaToken,
      verifyRole([0, 1, 2]),
      clientController.getClientDetail
    );

  app.use(process.env.URI_API, router);
};
