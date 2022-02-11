document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
            const data = response.data;
            alert(data);
        });
};

document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
        .then(function (response) {
            const data = response.data
            alert(data)
        })
}

/*******************************
 * ALBUM SECTION
 ******************************/

const albumContainer = document.getElementById("album-container")
const form = document.querySelector("form")

const baseURL = "http://localhost:4000/api/albums"

const albumCallback = ({
    data: albums
}) => displayAlbums(albums)
const errCallback = err => console.log(err)

const getAllAlbums = () => axios.get(baseURL).then(albumCallback).catch(errCallback)
const createAlbum = body => axios.post(baseURL, body).then(albumCallback).catch(errCallback)
const deleteAlbum = id => axios.delete(`${baseURL}/${id}`).then(albumCallback).catch(errCallback)
const updateAlbum = (id, type) => axios.put(`${baseURL}/${id}`, {
    type
}).then(albumCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let artist = document.querySelector('#artist')
    let rating = document.querySelector("#rating")
    let imgURL = document.querySelector('#imgURL')

    let bodyObj = {
        title: title.value,
        artist: artist.value,
        rating: rating.value,
        imgURL: imgURL.value
    }

    createAlbum(bodyObj)

    title.value = ''
    artist.value = ''
    rating.value = ''
    imgURL.value = ''
}

function createAlbumCard(album) {
    const albumCard = document.createElement('div')
    albumCard.classList.add('album-card')

    albumCard.innerHTML = `<img alt='album cover image' src=${album.imgURL} class="album-cover-image"/>
    <p class="title">${album.title}</p>
    <p class="artist">${album.artist}</p>
    <div class="btns-container">
        <button onclick="updateAlbum(${album.id}, 'minus')">-</button>
        <p class="album-rating">${album.rating}/10</p>
        <button onclick="updateAlbum(${album.id}, 'plus')">+</button>
    </div>
    <button class="delete-button" onclick="deleteAlbum(${album.id})">delete</button>
    `


    albumContainer.appendChild(albumCard)
}

function displayAlbums(arr) {
    albumContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createAlbumCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllAlbums()