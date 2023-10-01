const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIA2KFZC7FUE3DWUZA3",
  secretAccessKey: "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",
  region: "US East (N. Virginia) us-east-1",
});
module.exports = { s3 };
