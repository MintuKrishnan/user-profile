const dotenv = require('dotenv');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({ path: 'config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(chalk.black.bgGreen(' 🟢 DB connection successful! '))
  )
  .catch((err) => console.log(chalk.redBright(err)));

app.listen(port, () => {
  console.log(chalk.bgYellow.black(` App running on port ${port}... `));
});
