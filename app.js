const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const viewRouter = require('./routes/viewRoute');
const profileRouter = require('./routes/profileRouter');
const userRouter = require('./routes/userRoute');
const globalErrorHandler = require('./middleware/errorHandler');

dotenv.config({ path: 'config.env' });

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
  })
);

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   // console.log(req.cookies);

//   next();
// });

app.use('/', viewRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

module.exports = app;
