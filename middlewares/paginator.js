const pageable = (req, res, next) => {
  const pageParam = req.query.page || "0";
  const pageSizeParam = req.query.pageSize || "25";
  let page = parseInt(pageParam);
  let perPage = parseInt(pageSizeParam);

  req.body.pagination = {
    page,
    perPage,
  };

  next();
}

const headers = (req, res) => {
  const totalRecords = res.totalRecords;
  const numberOfPages = res.numberOfPages;
  const currentPage = req.body.pagination.page;

  res.header('X-Total-Records', totalRecords.toString());
  res.header('X-Total-Pages', numberOfPages.toString());
  res.header('X-Current-Page', currentPage.toString());

  return res.send({succes: true, data: res.data})
}

module.exports = {
  pageable,
  headers,
};