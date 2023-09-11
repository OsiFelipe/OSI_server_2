const productService = require("../services/product");

const getProduct = async (req, res) => {
  try {
    const result = await productService.getProduct();
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getProductPaginate = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await productService.getProductPaginate({
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

const addProduct = async (req, res) => {
  try {
    const result = await productService.addProduct(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const editProduct = async (req, res) => {
  try {
    const {
      params: { idProduct },
    } = req;
    const result = await productService.editProduct(idProduct, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {
      params: { idProduct },
    } = req;
    if (idProduct === "undefined") {
      throw "Missing Property";
    }
    const result = await productService.deleteProduct({ id: idProduct });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductPaginate,
};
