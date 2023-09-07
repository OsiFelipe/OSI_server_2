const express = require("express");
const customToolController = require("../../controllers/customTool.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/custom-tool/:idProduct")
    .put(
      verificaToken,
      verifyRole([0, 1]),
      customToolController.editCustomTool
    );

  app.use(process.env.URI_API, router);
};
