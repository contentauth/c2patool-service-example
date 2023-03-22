/**
 * Copyright 2023 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const fsPromises = fs.promises;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const _ = require('lodash');
const fetch = require('node-fetch');
const util = require('util');
const child = require('child_process')
let exec = util.promisify(child.exec);

const port = process.env.PORT || 8000;

var app = express();
app.use(express.static('client'));
let imageFolder = 'uploads'
app.use(express.static(imageFolder));

// Create a local folder to hold images in this example.
if(!fs.existsSync(imageFolder)){
  fs.mkdirSync(imageFolder)
}
// Enable files upload.
app.use(fileUpload({
  createParentPath: true,
  limits: { 
      fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  },
}));

// Add other middleware.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({type:"image/*",limit:'20mb', extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Runs c2patool to get version info using exec
app.get('/version', async function (req, res) {
  try {
    let result = await exec('./c2patool --version');
    console.log(result);
    res.send(result.stdout);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Uploads a file, adds a C2PA manifest and returns a URL
app.post('/upload', async (req, res) => { 
  try {
    let body = req.body
    let fileName = req.query.name;
    let filePath = `${imageFolder}/${fileName}`;
    await fsPromises.appendFile(filePath, Buffer.from(req.body),{flag:'w'});
    let command = `./c2patool "${filePath}" -m manifest.json -o "${filePath}" -f`;
    let result = await exec(command);
    let report = JSON.parse(result.stdout)
    //console.log(report);
    res.send({
      status: "success",
      message: 'C2PA manifest added',
      data: {
        name: fileName,
        url: `http://localhost:${port}/${fileName}`,
        report
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// the default endpoint is test page for this service
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

// start the http server
app.listen(port, () => 
  console.log(`CAI HTTP server listening on port ${port}.`)
);

