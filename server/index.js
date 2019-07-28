const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const users = require('./routes/users');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/kitchenTicketing',
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to mongoDB`);
    }
  }
);

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', router);
app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
