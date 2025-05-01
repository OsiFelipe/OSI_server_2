const express = require("express");
const chemicalTrackerClientController = require("../../controllers/chemicalTrackerClient.controller");
const awsController = require("../../controllers/aws.controller");
const { uploadFile } = require("../../middlewares/upload");
const router = express.Router();

module.exports = (
  app,
  verificaToken,
  verifyRole,
  verificaTokenClient,
  verifyRoleClient,
) => {
  router
    .route("/chemical-client/:idWell")
    .get(
      verificaTokenClient,
      verifyRoleClient([3]),
      chemicalTrackerClientController.getChemicalByWellId,
    );

  router
    .route("/chemical-list/:idWell")
    .get(
      verificaToken,
      verifyRole([3]),
      chemicalTrackerClientController.getChemicalByWellId,
    );

  router
    .route("/pdf-chemical")
    .post(
      verificaTokenClient,
      verifyRoleClient([3]),
      awsController.getDocumentByKey,
    );

  router
    .route("/chemical-upload")
    .post(uploadFile.single("file"), awsController.uploadToAws);

  router
    .route("/pdf-chemical-adm")
    .post(verificaToken, verifyRole([3]), awsController.getDocumentByKey);

  router
    .route("/chemical-file/:idChemical")
    .delete(
      verificaToken,
      verifyRole([3]),
      chemicalTrackerClientController.deleteChemicalTrackerClient,
    );

  app.use(process.env.URI_API, router);
};
