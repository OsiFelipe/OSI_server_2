const express = require("express");
const paginator = require("../../middlewares/paginator");
const wellController = require("../../controllers/well.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/well")
    .get(verificaToken, verifyRole([0, 1, 2]), wellController.getWell)
    .post(verificaToken, verifyRole([0, 1]), wellController.addWell);

  router
    .route("/well-paginate")
    .get(verificaToken, verifyRole([0, 1, 2]), [
      paginator.pageable,
      wellController.getWellPaginate,
      paginator.headers,
    ]);

  router
    .route("/well/:idWell")
    .put(verificaToken, verifyRole([0, 1]), wellController.editWell)
    .delete(verificaToken, verifyRole([0, 1]), wellController.deleteWell);

  router
    .route("/well/client/:clientId")
    .get(
      verificaToken,
      verifyRole([0, 1, 2]),
      wellController.getWellByClientId
    );

  router
    .route("/well-detail/:idWell")
    .get(verificaToken, verifyRole([0, 1, 2]), wellController.getWellDetail);

  app.use(process.env.URI_API, router);
};
