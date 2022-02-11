const albums = require("./db.json")
let id = albums.length

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
            "Cool shirt!",
            "Your Javascript skills are stellar.",
        ];

        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];

        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["You are what you eat, choosewisely",
            "Real G's move in silence like lasagna", "Thirty-eight revolve like the sun round the earth", "Music comes on people start to dance, but you ate so much you nearly split your pants", "I like my beats funky. I'm spunky. I like my oatmeal lumpy."
        ]

        // get random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune)
    },

    /****************************************
     * ALBUM FUNCTIONS
     ***************************************/

    getAlbums: (req, res) => {
        res.status(200).send(albums)
    },
    createAlbum: (req, res) => {
        let {
            title,
            artist,
            rating,
            imgURL
        } = req.body
        let newAlbum = {
            id,
            title,
            artist,
            rating,
            imgURL
        }
        albums.push(newAlbum)
        res.status(200).send(albums)
    },
    updateAlbum: (req, res) => {
        const {
            id,
            type
        } = req.body
        const index = albums.findIndex(elem => elem.id === +req.params.id)

        if (type === "plus" && albums[index].rating < 10) {
            albums[index].rating += 1
        } else if (type === "minus" && albums[index].rating > 0) {
            albums[index].rating -= 1
        } else {
            res.status(400).send("Bad request")
            return
        }
        res.status(200).send(albums)
    },
    deleteAlbum: (req, res) => {
        let index = albums.findIndex(elem => elem.id === +req.params.id)
        albums.splice(index, 1)
        res.status(200).send(albums)
    }

}