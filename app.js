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

writetoFile = notes => {
    writeFileAsync("./db/db.json", JSON.stringify(notes)).then(() => console.log("Successfully wrote to db.json!"))

}

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
    console.log(`Adding the following note: ${newNote}`)
    noteArr.push(newNote);
    const noteId = mapId(noteArr);
    console.log(`Updated notes: ${noteArr}`)
    writetoFile(noteArr);
    return res.json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {

    const noteArr = await getJSON();
    console.log(req.params.id);
    const deleteId = req.params.id;
    console.log(`Chose to delete Note ID: ${deleteId}`);

    for (let i = 0; i < noteArr.length; i++) {
        if (deleteId == noteArr[i].id) {
            console.log("Removing Note ID " + noteArr[i].id)
            noteArr.splice(i, 1);
        };
    }
    console.log(noteArr)
    mapId(noteArr);
    writetoFile(noteArr);
    res.json(noteArr);
})

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});