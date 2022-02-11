const express = require("express");
const cors = require("cors");
const ctrl = require("./controller")

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", ctrl.getCompliment)
app.get("/api/fortune", ctrl.getFortune)

app.get("/api/albums", ctrl.getAlbums)
app.post("/api/albums", ctrl.createAlbum)
app.put("/api/albums/:id", ctrl.updateAlbum)
app.delete("/api/albums/:id", ctrl.deleteAlbum)


app.listen(4000, () => console.log("Server running on 4000"));