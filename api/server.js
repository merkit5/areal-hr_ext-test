const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config({path: './.env'});

const organizationRouter = require('./routes/organizationRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/organizations', organizationRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});