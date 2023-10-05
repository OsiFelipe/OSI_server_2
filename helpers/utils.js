const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

module.exports = {
  generateRandomString,
};
