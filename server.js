const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(express.static('public'));
app.use(express.static(__dirname + '/css'));

const timeRoutes = require('./routes/time');
app.use("/routes/time", timeRoutes);   // remove the extra "/routes"

const nameRoutes = require('./routes/name');
app.use("/routes/name", nameRoutes);   // already correct

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/form', (req, res) => {
    res.sendFile(__dirname + '/views/form.html');
});

app.get('/:word/echo', (req, res) => {
    res.json({ "echo": req.params.word });
});

// 404 middleware
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));