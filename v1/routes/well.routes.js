const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const wellController = require("../../controllers/well.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/well")
    .get([paginator.pageable, wellController.getWell, paginator.headers])
    .post(wellController.addWell);

  router
    .route("/well/:idWell")
    .put(wellController.editWell)
    .delete(wellController.deleteWell);

  router.route("/well/client/:clientId").get(wellController.getWellByClientId);

  app.use(process.env.URI_API, router);
};
