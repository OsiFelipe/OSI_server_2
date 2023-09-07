const express = require("express");
const paginator = require("../../middlewares/paginator");
const tallyController = require("../../controllers/tally.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/tally")
    .get(verificaToken, verifyRole([0, 1, 2]), tallyController.getTally)
    .post(verificaToken, verifyRole([0, 1]), tallyController.addTally);

  router
    .route("/tally-detail")
    .get(verificaToken, verifyRole([0, 1, 2]), [
      paginator.pageable,
      tallyController.getTallyDetail,
      paginator.headers,
    ]);

  router
    .route("/tally/:idTally")
    .get(verificaToken, verifyRole([0, 1, 2]), tallyController.getTallyById)
    .put(verificaToken, verifyRole([0, 1]), tallyController.editTally)
    .delete(verificaToken, verifyRole([0, 1]), tallyController.deleteTally);

  app.use(process.env.URI_API, router);
};
