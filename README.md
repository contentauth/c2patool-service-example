# C2PA Express Node.js service example 

This is an example of an Express Node.js service that can add simple C2PA manifests to uploaded images using c2patool. This is only for demonstration. It is written in plain Javascript, HTML and CSS to be as generic as possible.

It is not an example of the C2PA Javascript API. The client code displays information from  JSON manifests returned from the service that were created by c2patool.

## Install and build
- Install npm 

    https://nodejs.org/en/download

- Clone this repo

    `git clone https://github.com/contentauth/c2pa_service_example.git`

- This depends on c2patool so you must download one for your platform from 

    https://github.com/contentauth/c2patool/releases

- Extract c2patool and put a copy in the root of this repo

- Install the required packages

    `npm install`

- Start the Service

    `npm start`

## Try the Web app
- Open a browser to http://localhost:8000

- Click on the Choose Files button and select one or more jpeg or png images. 

- Hover over the badge for some information about the associated manifest

- Currently the service returns the full sized image - not thumbnails.

- You can right click and download the images to view them in verify

The images will be uploaded to this service, stored in a folder and then a c2pa manifest will be added using the c2patool. 
## Customizing

- Modify the information added to the file

The data added to the manifest is determined by the `manifest.json` file in the root folder. You can modify `manifest.json` to add other information.

You can read more about c2patool and manifests [here](https://github.com/contentauth/c2patool)




