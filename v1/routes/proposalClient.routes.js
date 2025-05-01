const express = require("express");
const proposalClientController = require("../../controllers/proposalClient.controller");
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
    .route("/proposal-client/:idWell")
    .get(
      verificaTokenClient,
      verifyRoleClient([3]),
      proposalClientController.getProposalByWellId,
    );

  router
    .route("/proposal-list/:idWell")
    .get(
      verificaToken,
      verifyRole([3]),
      proposalClientController.getProposalByWellId,
    );

  router
    .route("/pdf-proposal")
    .post(
      verificaTokenClient,
      verifyRoleClient([3]),
      awsController.getDocumentByKey,
    );

  router
    .route("/proposal-upload")
    .post(uploadFile.single("file"), awsController.uploadToAws);

  router
    .route("/pdf-proposal-adm")
    .post(verificaToken, verifyRole([3]), awsController.getDocumentByKey);

  router
    .route("/proposal-file/:idProposal")
    .delete(
      verificaToken,
      verifyRole([3]),
      proposalClientController.deleteProposalClient,
    );

  app.use(process.env.URI_API, router);
};
