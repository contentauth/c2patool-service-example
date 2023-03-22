# C2PA Express Node.js service example 

This is an example of an Express Node.js service that can add C2PA manifests to uploaded images. This is only for demonstration.

## Install and build
- Install npm 

    https://nodejs.org/en/download

- Clone this repo

    `git clone https://github.com/contentauth/c2pa_service_example.git`

- Download a current c2patool for your platform from 

    https://github.com/contentauth/c2patool/releases

- Extract c2patool and put a copy in the root of this repo

- Install the required packages

    `npm install`

- Start the Service

    `npm start`

## Try the Web app
- Open a browser to http://localhost:8000

- Click on the Choose Files button and select one or more jpeg or png images. 

The images will be uploaded to this service, stored in a folder and then a c2pa manifest will be added using the c2patool. The data added to the manifest is determined by the manifest.json file in the root folder. You can modify this file to add other information.

## Customizing

- Modify the information added to the file

The data added to the manifest is determined by the manifest.json file in the root folder. You can modify this file to add other information.

You can read more about c2patool and manifests [here](https://github.com/contentauth/c2patool)




