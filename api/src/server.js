const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config({ path: '../.env' });

const organizationRouter = require('./routes/organizationRouter');
const departmentRouter = require('./routes/departmentRouter');
const positionRouter = require('./routes/positionRouter');
const employeeRouter = require('./routes/employeeRouter');
const hrOperationsRouter = require('./routes/hrOperationsRouter');
const userRouter = require('./routes/userRouter');
const changeHistoryRouter = require('./routes/changeHistoryRouter');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/organizations', organizationRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/positions', positionRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/hr-operations', hrOperationsRouter);
app.use('/api/users', userRouter);
app.use('/api/changeHistory', changeHistoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
