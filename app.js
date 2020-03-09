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
        console.log(data);
        return JSON.parse(data);
    });

}

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", async (req, res) => {

    const json = await getJSON();

    res.json(json);




});

app.post("api/notes", (req, res) => {



})

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});