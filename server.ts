import express from "express";
import multer from "multer";
import aws from "aws-sdk";

import multerS3 from "multer-s3";
import { run } from "./libs/fileManager";

const app = express();
const port = 3000;

app.use(express.static("public"));
const spacesEndpoint = new aws.Endpoint("https://sgp1.digitaloceanspaces.com/");

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    //@ts-ignore
    s3: s3,
    bucket: "msquarefdc",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, "oakar-phyo-aung/" + file.originalname);
    },
  }),
}).array("files", 1);

app.post("/cloudUpload", (request, response, next) => {
  upload(request, response, async (error:any) => {
    if (error) {
      console.log(error);
      return response.send({ message: "file upload error" });
    }
    const contentData:any = await run();
    console.log(contentData);
    
    const filesContents  = contentData.Contents;
    console.log(filesContents);
    response.send({ message: "File upload successful", data:filesContents});
  });
});

app.listen(port, () => {
  console.log(`example is listen in ${port}!`);
});
