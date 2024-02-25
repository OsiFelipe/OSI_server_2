const pullingService = require("../services/pullingDesign");

const getPullingList = async (req, res) => {
  try {
    const result = await pullingService.getPullingList();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getPullingDetail = async (req, res) => {
  try {
    const {
      params: { idPulling },
    } = req;
    if (idPulling === "undefined") {
      throw "Missing Property";
    }
    const result = await pullingService.getPullingDetail({ id: idPulling });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const createPulling = async (req, res) => {
  try {
    const result = await pullingService.createPulling(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const editPulling = async (req, res) => {
  try {
    const {
      params: { idPulling },
    } = req;
    const result = await pullingService.editPulling(idPulling, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const deletePulling = async (req, res) => {
  try {
    const {
      params: { idPulling },
    } = req;
    if (idPulling === "undefined") {
      throw "Missing Property";
    }
    const result = await pullingService.deletePulling({ id: idPulling });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getPullingList,
  getPullingDetail,
  createPulling,
  editPulling,
  deletePulling,
};
