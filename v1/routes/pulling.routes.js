const express = require("express");
const pullingController = require("../../controllers/pulling.controller");
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
    .route("/pulling-client/:idWell")
    .get(
      verificaTokenClient,
      verifyRoleClient([3]),
      pullingController.getPullingByWellId,
    );

  router
    .route("/pulling-list/:idWell")
    .get(verificaToken, verifyRole([3]), pullingController.getPullingByWellId);

  router
    .route("/pdf-pulling")
    .post(
      verificaTokenClient,
      verifyRoleClient([3]),
      awsController.getDocumentByKey,
    );

  router
    .route("/pulling-upload")
    .post(uploadFile.single("file"), awsController.uploadToAws);

  router
    .route("/pdf-pulling-adm")
    .post(verificaToken, verifyRole([3]), awsController.getDocumentByKey);

  router
    .route("/pulling-file/:idPulling")
    .delete(verificaToken, verifyRole([3]), pullingController.deletePulling);

  app.use(process.env.URI_API, router);
};
