const proposalClientService = require("../services/proposalClient");
const getProposalByWellId = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    const result = await proposalClientService.getProposalByWellId(idWell);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const deleteProposalClient = async (req, res) => {
  try {
    const {
      params: { idProposalClient },
    } = req;
    if (idProposalClient === "undefined") {
      throw "Missing Property";
    }
    const result = await proposalClientService.deleteProposalClient({
      id: idProposalClient,
    });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getProposalByWellId,
  deleteProposalClient,
};
