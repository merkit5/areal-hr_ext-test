const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config({path: './.env'});

const organizationRouter = require('./routes/organizationRouter');
const departmentRoutes = require('./routes/departmentRoutes');
const positionRoutes = require('./routes/positionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/organizations', organizationRouter);
app.use('/departments', departmentRoutes);
app.use('/positions', positionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});