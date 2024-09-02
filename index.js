const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");

//parse json
app.use(express.json());

// In-memory database
let issues = [
    { id: 1, title: "Login Issue", description: "Cannot login to the website" },
    { id: 2, title: "UI Bug", description: "Buttons are not responsive on mobile views" }
];



// CRUD operations

// Create
app.post('/api/issues', (req, res) => {
    const { title, description } = req.body;
    console.log(req.body, "req.body")
    const newIssue = {
        id: issues.length + 1,
        title,
        description
    };
    issues.push(newIssue);
    res.status(201).send(newIssue);
});

// Read all
app.get('/api/issues', (req, res) => {
    res.status(200).send(issues);
});

// Read one
app.get('/api/issues/:id', (req, res) => {
    const issue = issues.find(i => i.id === parseInt(req.params.id));
    if (!issue) {
        res.status(404).send('Issue not found');
    } else {
        res.status(200).send(issue);
    }
});

// Update
app.put('/api/issues/:id', (req, res) => {
    const issue = issues.find(i => i.id === parseInt(req.params.id));
    if (!issue) {
        res.status(404).send('Issue not found');
    } else {
        issue.title = req.body.title || issue.title;
        issue.description = req.body.description || issue.description;
        res.status(200).send(issue);
    }
});

// Delete
app.delete('/api/issues/:id', (req, res) => {
    const index = issues.findIndex(i => i.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send('Issue not found');
    } else {
        issues = issues.filter(i => i.id !== parseInt(req.params.id));
        res.status(204).send();
    }
});

app.use(express.static(path.join(__dirname,  "client", "build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
