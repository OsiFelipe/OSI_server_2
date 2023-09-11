const proposalService = require("../services/proposal");

const getProposal = async (req, res) => {
  try {
    const result = await proposalService.getProposal();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getProposalDetail = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await proposalService.getProposalDetail({
      page,
      perPage,
      search,
    });
    res.totalRecords = result.count;
    res.numberOfPages = Math.ceil(result.count / perPage);
    res.data = result.rows;
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getProposalById = async (req, res) => {
  try {
    const {
      params: { idProposal },
    } = req;
    if (idProposal === "undefined") {
      throw "Missing Property";
    }
    const result = await proposalService.getProposalById({ id: idProposal });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getInfoSolTechProposalById = async (req, res) => {
  try {
    const {
      params: { idProposal },
    } = req;
    if (idProposal === "undefined") {
      throw "Missing Property";
    }
    const result = await proposalService.getInfoSolTechProposalById({
      id: idProposal,
    });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getInfoTechProposal = async (req, res) => {
  try {
    const result = await proposalService.getInfoTechProposal();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const addProposal = async (req, res) => {
  try {
    const result = await proposalService.addProposal(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const editProposal = async (req, res) => {
  try {
    const {
      params: { idProposal },
    } = req;
    const result = await proposalService.editProposal(
      { id: idProposal },
      req.body
    );
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const deleteProposal = async (req, res) => {
  try {
    const {
      params: { idProposal },
    } = req;
    if (idProposal === "undefined") {
      throw "Missing Property";
    }
    const result = await proposalService.deleteProposal({ id: idProposal });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  getProposal,
  getProposalById,
  getProposalDetail,
  getInfoTechProposal,
  getInfoSolTechProposalById,
  addProposal,
  editProposal,
  deleteProposal,
};
