const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const app = express();
const PORT = 8080;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

getJSON = () => {

    return readFileAsync("./db/db.json", "utf8").then(data => {
        return JSON.parse(data);
    });

};

mapId = (arr) => {
    return arr.map((val, index) => {
        val.id = index;
        return val;
    });
}

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", async (req, res) => {

    const noteArr = await getJSON();
    res.json(noteArr);

});

app.post("/api/notes", async (req, res) => {

    const noteArr = await getJSON();
    const newNote = req.body;
    noteArr.push(newNote);
    const noteId = mapId(noteArr);
    writeFileAsync("./db/db.json", JSON.stringify(noteId)).then(() => console.log("Successfully wrote to db.json!"))
    return res.json(newNote);
});

// app.delete("/api/notes/:id")

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});