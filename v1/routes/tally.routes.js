const express = require("express");
const paginator = require('../../middlewares/paginator'); 
const tallyController = require("../../controllers/tally.controller");
const router = express.Router();

module.exports = (app) => {
  router
    .route("/tally")
    .get(tallyController.getTally)
    .post(tallyController.addTally);

  router.route("/tally-detail").get([paginator.pageable, tallyController.getTallyDetail, paginator.headers]);

  router
    .route("/tally/:idTally")
    .get(tallyController.getTallyById)
    .put(tallyController.editTally)
    .delete(tallyController.deleteTally);

  app.use(process.env.URI_API, router);
};
