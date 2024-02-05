const express = require("express");
const paginator = require("../../middlewares/paginator");
const pullingController = require("../../controllers/pullingDesign.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/pulling")
    .get(verificaToken, verifyRole([0, 1, 2]), pullingController.getPullingList)
    .post(verificaToken, verifyRole([0, 1]), pullingController.createPulling);

  // router
  //   .route("/tally-detail")
  //   .get(verificaToken, verifyRole([0, 1, 2]), [
  //     paginator.pageable,
  //     pullingController.getTallyDetail,
  //     paginator.headers,
  //   ]);

  router
    .route("/pulling/:idPulling")
    .get(
      verificaToken,
      verifyRole([0, 1, 2]),
      pullingController.getPullingDetail
    )
    .put(verificaToken, verifyRole([0, 1]), pullingController.editPulling)
    .delete(verificaToken, verifyRole([0, 1]), pullingController.deletePulling);

  app.use(process.env.URI_API, router);
};
