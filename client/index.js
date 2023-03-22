
// Example of directly sending files from change event (without form)
document.getElementById('files').addEventListener('change', (event) => {
    // reset the container
    var container = document.getElementById('gallery');
    container.innerHTML = ""; 

    // upload all the selected files to sign, and show the modified images
    for (file of event.target.files) {
        let name = file.name;
        const reader = new FileReader();
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
                console.log(body)
                if (body.status == "success") {
                    var img = document.createElement('img');
                    img.src = body.data.url;
                    container.appendChild(img);
                }
            }
            catch (err) {
                console.log(err)
            }
        });
        reader.readAsArrayBuffer(file);
    }
});

