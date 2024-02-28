const AWS = require("aws-sdk");
const pullingService = require("../services/pulling");
const { generateRandomString } = require("../helpers/utils");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const bucketName = process.env.AWS_BUCKET_NAME;

const getPullingByKey = (req, res) => {
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
        'inline; filename="' + req.params.key + '"'
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
    const { customName } = req.body;
    const client = JSON.parse(req.body.client);
    const well = JSON.parse(req.body.well);
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
        console.log(data);
        if (err) {
          console.log("Im here at this point");
          return res
            .status(err.status || 500)
            .send({ success: false, data: { error: err.message || err } });
        } else {
          const result = await pullingService.addPulling(
            client,
            well,
            customName,
            key,
            fileName
          );
          res.send({ success: true, data: result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send({ success: false, data: { error: err.message || err } });
  }
};

module.exports = {
  getPullingByKey,
  uploadToAws,
};
