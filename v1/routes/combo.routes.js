const express = require("express");
const paginator = require("../../middlewares/paginator");
const comboController = require("../../controllers/combo.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/combo")
    .get(verificaToken, verifyRole([0, 1, 2, 3]), comboController.getCombo)
    .post(verificaToken, verifyRole([0, 1]), comboController.addCombo);

  router
    .route("/combo-paginate")
    .get(verificaToken, verifyRole([0, 1, 2, 3]), [
      paginator.pageable,
      comboController.getComboPaginate,
      paginator.headers,
    ]);

  router
    .route("/combo/:idCombo")
    .put(verificaToken, verifyRole([0, 1]), comboController.editCombo)
    .delete(verificaToken, verifyRole([0, 1]), comboController.deleteCombo);

  app.use(process.env.URI_API, router);
};
