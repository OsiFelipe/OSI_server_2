const clientService = require("../services/client");

const getClient = async (req, res) => {
  try {
    const result = await clientService.getClient();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getClientDetail = async (req, res) => {
  try {
    const {
      params: { idClient },
    } = req;
    const result = await clientService.getClientDetail(idClient);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getClientPaginate = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await clientService.getClientPaginate({
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
      .send({ success: false, data: { error: error.message || error } });
  }
};

const addClient = async (req, res) => {
  try {
    const result = await clientService.addClient(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const editClient = async (req, res) => {
  try {
    const {
      params: { idClient },
    } = req;
    const result = await clientService.editClient(idClient, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const deleteClient = async (req, res) => {
  try {
    const {
      params: { idClient },
    } = req;
    if (idClient === "undefined") {
      throw "Missing Property";
    }
    const result = await clientService.deleteClient({ id: idClient });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getClient,
  addClient,
  editClient,
  deleteClient,
  getClientPaginate,
  getClientDetail,
};
