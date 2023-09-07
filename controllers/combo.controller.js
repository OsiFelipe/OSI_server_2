const comboService = require("../services/combo");

const getCombo = async (req, res) => {
  try {
    const result = await comboService.getCombo();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getComboPaginate = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await comboService.getComboPaginate({
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
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const addCombo = async (req, res) => {
  try {
    const result = await comboService.addCombo(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const editCombo = async (req, res) => {
  try {
    const {
      params: { idCombo },
    } = req;
    const result = await comboService.editCombo(idCombo, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const deleteCombo = async (req, res) => {
  try {
    const {
      params: { idCombo },
    } = req;
    if (idCombo === "undefined") {
      throw "Missing Property";
    }
    const result = await comboService.deleteCombo({ id: idCombo });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  getCombo,
  addCombo,
  editCombo,
  deleteCombo,
  getComboPaginate,
};
