const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => {

    const db = fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err;
        } else {
            const obj = JSON.parse(data)
            return res.json(obj);

        }
    });

})

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});