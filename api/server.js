const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config({path: '../.env'});

const organizationRouter = require('./routes/organizationRouter');
const departmentRouter = require('./routes/departmentRouter');
const positionRouter = require('./routes/positionRouter');
const employeeRouter = require('./routes/employeeRouter');
const addressRouter = require('./routes/addressRouter');
const fileRouter = require('./routes/fileRouter');
const hrOperationsRouter = require('./routes/hrOperationsRouter');
const passportRouter = require('./routes/passportRouter');
const userRouter = require('./routes/userRouter');
const changeHistoryRouter = require('./routes/changeHistoryRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/organizations', organizationRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/positions', positionRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/files', fileRouter);
app.use('/api/hr-operations', hrOperationsRouter);
app.use('/api/passports', passportRouter);
app.use('/api/users', userRouter);
app.use('/api/changeHistory', changeHistoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});