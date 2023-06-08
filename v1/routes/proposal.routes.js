const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const proposalController = require("../../controllers/proposal.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/proposal")
    .get(proposalController.getProposal)
    .post(proposalController.addProposal);

  router.route("/proposal-detail").get([paginator.pageable, proposalController.getProposalDetail, paginator.headers]);

  router
    .route("/proposal/:idProposal")
    .get(proposalController.getProposalById)
    .put(proposalController.editProposal)
    .delete(proposalController.deleteProposal);

  router
    .route("/proposal-solution/:idProposal")
    .get(proposalController.getInfoSolTechProposalById);

  router.route("/tech-proposal").get(proposalController.getInfoTechProposal);

  app.use(process.env.URI_API, router);
};
