const express = require("express");
const fs = require("fs");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const app = express();
const port = 3000;

app.use(express.static("public"));

const spacesEndpoint = new aws.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "oakar-phyo-aung/" + file.originalname);
    },
  }),
}).array("files", 1);
app.post("/cloudUpload", function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.send({ message: "file upload error" });
    }
    console.log("File uploaded successful");
    response.send({ message: "File upload successful" });
  });
});

app.listen(port, () => {
  console.log(`example is listen in ${port}!`);
});
