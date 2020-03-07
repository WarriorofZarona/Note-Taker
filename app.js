const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/api/notes", (req, res) => {

})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});