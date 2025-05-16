const AWS = require("aws-sdk");
const pullingService = require("../services/pulling");
const chemicalTrackerService = require("../services/chemicalTrackerClient");
const proposalClientService = require("../services/proposalClient");
const { generateRandomString } = require("../helpers/utils");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET_NAME;

const getDocumentByKey = (req, res) => {
  try {
    const { key } = req.body;
    const s3params = {
      Bucket: bucketName,
      Key: key,
    };
    s3.getObject(s3params, (err, data) => {
      if (err) {
        console.log(err);
        return res
          .status(err.status || 500)
          .send({ success: false, data: { error: err.message || err } });
      }

      const buffer = data.Body;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + req.params.key + '"',
      );
      res.send({ success: true, data: buffer });
    });
  } catch (err) {
    return res
      .status(err.status || 500)
      .send({ success: false, data: { error: err.message || err } });
  }
};

const uploadToAws = (req, res) => {
  try {
    const { customName, type } = req.body;
    const client = JSON.parse(req.body.client);
    const well = JSON.parse(req.body.well);
    const installationDate = req.body.installationDate;
    const fileName = req.file.originalname;
    const key =
      client.name +
      "/" +
      well.name +
      "/" +
      customName +
      "/" +
      fileName +
      "-" +
      generateRandomString();
    s3.upload(
      {
        Bucket: bucketName,
        Key: key,
        Body: req.file.buffer,
      },
      async (err, data) => {
        if (err) {
          console.log(err);
          return res
            .status(err.status || 500)
            .send({ success: false, data: { error: err.message || err } });
        } else {
          let result;
          switch (type) {
            case "pulling":
              result = await pullingService.addPulling(
                client,
                well,
                customName,
                key,
                fileName,
                installationDate,
              );

            case "proposal":
              result = await proposalClientService.addProposalClient(
                client,
                well,
                key,
                fileName,
              );
              break;
            case "chemical-tracker":
              result = await chemicalTrackerService.addChemicalTrackerClient(
                client,
                well,
                key,
                fileName,
              );
              break;
            default:
              break;
          }
          res.send({ success: true, data: result });
        }
      },
    );
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send({ success: false, data: { error: err.message || err } });
  }
};

module.exports = {
  getDocumentByKey,
  uploadToAws,
};
