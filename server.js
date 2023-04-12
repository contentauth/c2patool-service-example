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

// serve our web client
app.use(express.static('client'));

// Allow urls from the uploads folder to be served
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
      fileSize: 2 * 1024 * 1024 * 1024 // max upload file(s) size
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
    let fileName = req.query.name;
    let filePath = `${imageFolder}/${fileName}`;
    // upload the file
    await fsPromises.appendFile(filePath, Buffer.from(req.body),{flag:'w'});

    // call c2patool to add a manifest
    let command = `./c2patool "${filePath}" -m manifest.json -o "${filePath}" -f`;
    let result = await exec(command);
    // get the manifest store report from stdout
    let report = JSON.parse(result.stdout)
    res.send({
        name: fileName,
        url: `http://localhost:${port}/${fileName}`,
        report
      });
  } catch (err) {
    console.log(err);
    // return errors to the client
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

