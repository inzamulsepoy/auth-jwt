const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/signin.html');
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())',
            [username, email, password]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

app.post('/signin', async (req, res) => {
    const { login, password } = req.body; // login can be username or email
    if (!login || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE (username = ? OR email = ?) AND password = ?',
            [login, login, password]
        );

        if (rows.length > 0) {
            res.json({ message: 'Login successful', redirect: '/blog.html' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
