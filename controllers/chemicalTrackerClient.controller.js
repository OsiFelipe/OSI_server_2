const chemicalTrackerClientService = require("../services/chemicalTrackerClient");
const getChemicalByWellId = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    const result = await chemicalTrackerClientService.getChemicalByWellId(
      idWell,
    );
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const deleteChemicalTrackerClient = async (req, res) => {
  try {
    const {
      params: { idChemical },
    } = req;
    if (idChemical === "undefined") {
      throw "Missing Property";
    }
    const result =
      await chemicalTrackerClientService.deleteChemicalTrackerClient({
        id: idChemical,
      });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getChemicalByWellId,
  deleteChemicalTrackerClient,
};
