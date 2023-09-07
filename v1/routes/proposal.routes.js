const express = require("express");
const paginator = require("../../middlewares/paginator");
const proposalController = require("../../controllers/proposal.controller");
const router = express.Router();

module.exports = (app, verificaToken, verifyRole) => {
  router
    .route("/proposal")
    .get(verificaToken, verifyRole([0, 1, 2]), proposalController.getProposal)
    .post(verificaToken, verifyRole([0, 1]), proposalController.addProposal);

  router
    .route("/proposal-detail")
    .get(verificaToken, verifyRole([0, 1, 2, 3]), [
      paginator.pageable,
      proposalController.getProposalDetail,
      paginator.headers,
    ]);

  router
    .route("/proposal/:idProposal")
    .get(
      verificaToken,
      verifyRole([0, 1, 2, 3]),
      proposalController.getProposalById
    )
    .put(verificaToken, verifyRole([0, 1]), proposalController.editProposal)
    .delete(
      verificaToken,
      verifyRole([0, 1]),
      proposalController.deleteProposal
    );

  router
    .route("/proposal-solution/:idProposal")
    .get(
      verificaToken,
      verifyRole([0, 1, 2, 3]),
      proposalController.getInfoSolTechProposalById
    );

  router
    .route("/tech-proposal")
    .get(verificaToken, proposalController.getInfoTechProposal);

  app.use(process.env.URI_API, router);
};
