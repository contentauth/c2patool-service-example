# C2PA Express Node.js service example 

This is an example of a very simple Express Node.js service that uploads images and adds a C2PA manifest to each image.  It is written in plain Javascript, HTML, and CSS to be as generic as possible.

NOTE: This is **NOT** an example of the C2PA Javascript API. Rather, it demonstrates how a server application can call c2patool to add content credentials in a C2PA manifest to an image. The client JavaScript code simply displays information from the manifests.

## Install and build

Follow these steps:

1. Install Node.js and npm from <https://nodejs.org/en/download>.
1. Clone this repo by entering this command in a terminal window:
    ```
    git clone https://github.com/contentauth/c2pa_service_example.git
    ```
1. Download the latest version of c2patool for your platform from <https://github.com/contentauth/c2patool/releases>.
1. Extract the zip file and put a copy of the `c2patool` executable in the root of this repo (`c2pa_service_example` directory).  NOTE: Depending on your operating system, you may need to take some extra steps to be able to run this file; for example on MacOS you have to [follow the instructions to open a Mac app from an unidentified developer](https://support.apple.com/guide/mac-help/open-a-mac-app-from-an-unidentified-developer-mh40616/mac).  
1. Open a terminal window and install the required packages. Enter these commands
    ```
    cd <path_where_you_cloned_repo>/c2pa_service_example
    npm install
    ```
1. Start the service by entering this command:
    ```
    npm start
    ```
    You'll see this in your terminal:
    ```
    > c2pa_serve@0.1.0 start
    > nodemon server.js

    [nodemon] 2.0.21
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node server.js`
    CAI HTTP server listening on port 8000.
    ```

## Try the web app

1. Open a browser to http://localhost:8000.
1. Click the **Choose Files** button and select one or more JPEG or PNG images in the native file chooser dialog. 
    <br/>The service uploads the selected images, stores them in the `uploads` folder, and then calls the c2patool to add a C2PA manifest to each image. 
3. Hover over the badge for information about the associated manifest.
4. The service returns the full-sized image, not thumbnails.
5. Right-click and download an image to view the credentials on <https://verify.contentauthenticity.org/>.

## Customizing

The data added to the manifest is determined by the `manifest.json` file in the root folder. To modify the information added to the file, modify `manifest.json`.

For more information about c2patool and manifests, see [the documentation](https://opensource.contentauthenticity.org/docs/c2patool/).




