const imageContainer = window.document.getElementById('image-container');
const loader = document.getElementById('loader-container');

const count = 30;
const access_key = 'DNu1FRlXBUpkxgrrtSIvAeKFQMiYY5JQn6saV9n0-LY';
const url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=${count}`;

let photoArray = [];

// function to call the API from Unslash
let getPhotos = async () => {
    try {
        loader.hidden = false;
        const resposne = await fetch(url);
        photoArray = await resposne.json();

        displayPhotos();

    } catch (e) {
        console.log("Error Here", e)
    }
}


// function to display each image 
let displayPhotos = () => {
    console.log("Length of Photo Array", photoArray.length);
    console.log(photoArray);
    photoArray.forEach((photo) => {

        const anchor = document.createElement('a');
        const img = document.createElement('img');
        setAttributes(anchor, {
            title: photo.alt_description,
            target: "_blank",
            href: photo.links.html
        });
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,

        });
        anchor.appendChild(img)
        imageContainer.appendChild(anchor);
        loader.hidden = true;

    });
}

//  Common function to create elements and attributes
function setAttributes(element, attributes) {

    for (const key in attributes) {
        console.log('Key', key)
        console.log(attributes[key])
        element.setAttribute(key, attributes[key]);
    }

}

// Scroll bar event to trigger the API

window.addEventListener('scroll', () => {
    console.log('Inner Height', window.innerHeight)
    console.log('Offset Height', document.body.offsetHeight);
    console.log('ScrollY', window.scrollY);
    console.log('window.innerHeight + window.scrollY', window.innerHeight + window.scrollY)

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        getPhotos();
    }
});


getPhotos();


