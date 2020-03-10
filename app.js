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

getJSON = () => { // reads the db.json file
    return readFileAsync("./db/db.json", "utf8").then(data => JSON.parse(data))
        .catch(function (err) {
            console.log(err);
        });
};

writetoFile = notes => { //updates the db.json file
    writeFileAsync("./db/db.json", JSON.stringify(notes))
        .then(() => console.log("Successfully wrote to db.json!"))
        .catch(function (err) {
            console.log(err);
        });
};

mapId = (arr) => { //maps an ID based on index + 1
    return arr.map((val, index) => {
        val.id = index + 1; //First note in array will have ID of 1 and so on
        return val;
    });
};

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
    writetoFile(noteArr);
    return res.json(newNote);

});

app.delete("/api/notes/:id", async (req, res) => {

    const noteArr = await getJSON();
    const deleteId = req.params.id;

    for (let i = 0; i < noteArr.length; i++) {
        if (deleteId == noteArr[i].id) {
            noteArr.splice(i, 1);
        };
    };
    writetoFile(noteArr);
    res.send(200);
});

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});