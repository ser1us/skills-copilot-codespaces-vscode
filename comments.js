// Create web server

// Import modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up port
const port = process.env.PORT || 3000;

// Set up path to static files
app.use(express.static('public'));

// Set up path to database
const commentsPath = 'data/comments.json';

// Read comments from database
function readComments() {
    let comments = fs.readFileSync(commentsPath, 'utf8');
    return JSON.parse(comments);
}

// Write comments to database
function writeComments(comments) {
    fs.writeFileSync(commentsPath, JSON.stringify(comments));
}

// Get comments
app.get('/comments', (req, res) => {
    let comments = readComments();
    res.json(comments);
});

// Add comment
app.post('/comments', (req, res) => {
    let comments = readComments();
    comments.push(req.body);
    writeComments(comments);
    res.json(comments);
});

// Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
