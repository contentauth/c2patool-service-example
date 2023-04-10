/**
 * Copyright 2023 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it.
 */

// gather all the elements we need
const gallery = document.querySelector(".gallery");
const popup = document.querySelector(".popup");
const title = popup.querySelector(".title");
const signer = popup.querySelector(".signer");
const time = popup.querySelector(".time");
const producer = popup.querySelector(".producer");

// Add an image to the gallery
function addGalleryItem(data) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('container');

    var img = document.createElement('img');
    img.src = data.url;
    img.classList.add("image");
    galleryItem.appendChild(img);

    const badge = document.createElement('img');
    badge.src = "badge.svg";
    badge.classList.add("badge");
    galleryItem.appendChild(badge);

    gallery.appendChild(galleryItem);

    // add popup event listeners
    badge.addEventListener("mouseenter", function() {
        const rect = badge.getBoundingClientRect();

        const report = data.report;

        // get the active manifest
        const manifest = report.manifests[report.active_manifest];

        // show the title of the manifest, or the name of the image
        title.textContent = manifest.title || data.name;

        // show the issuer and time of the signature
        const issuer = manifest.signature_info?.issuer || "";
        signer.innerHTML = `Signed By: ${issuer}`;

        const sign_time = manifest.signature_info?.time;
        // convert ISO-8601 sign_time to local time
        const date = sign_time ? new Date(sign_time).toLocaleString() : "";
        time.innerHTML = sign_time ? `Signed On: ${date}` : "";

        // truncate the claim generator at first space for first token
        // and then replace underscores and forward slash with spaces
        const generator = manifest.claim_generator?.split(" ")[0].replace(/[_/]/g, " ")
        producer.innerHTML = `Produced With: ${generator}`;

        // Position the popup and show it
        popup.style.display = "block";
        popup.style.top = `${rect.top + window.scrollY}px`;
        const popupWidth = popup.getBoundingClientRect().width;
        popup.style.left = `${rect.left > popupWidth ? rect.left - popupWidth : rect.left + rect.width}px`;

    });
    
    badge.addEventListener("mouseleave", function() {
        // hide the popup
        popup.style.display = "none";
    });
}
    
// Example of directly sending files from change event (without using a form)
document.getElementById('files').addEventListener('change', (event) => {

    // reset the container
    gallery.innerHTML = ""; 

    // upload all the selected files to sign, and show the modified images
    for (file of event.target.files) {
        let name = file.name;
        const reader = new FileReader();

        // post the file to our server
        reader.addEventListener('load', async (event) => {
            try {
                let url = `http://localhost:8000/upload?name=${name}`
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": file.type,
                    },
                    body: event.target.result
                });

                let body = await response.json()
                
                // add the returned image data to the gallery
                addGalleryItem(body);
            }
            catch (err) {
                console.log(err)
            }
        });

        reader.readAsArrayBuffer(file);
    }

});

