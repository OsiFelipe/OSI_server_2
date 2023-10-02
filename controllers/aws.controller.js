const AWS = require("aws-sdk");
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

module.exports = {
  getPullingByKey,
};
