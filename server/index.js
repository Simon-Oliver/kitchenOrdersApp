const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/kitchenTicketing', {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

const router = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const orders = require('./routes/orders');

const app = express();

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/', router);
app.use('/users', users);
app.use('/users', auth);
app.use('/orders', orders);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
