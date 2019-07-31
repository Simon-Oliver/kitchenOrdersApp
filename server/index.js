const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

const router = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/kitchenTicketing', {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

const app = express();

// Passport Config
require('./config/passport')(passport);

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', router);
app.use('/users', users);
app.use('/users', auth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
