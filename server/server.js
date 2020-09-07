const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const formidable = require('formidable');
const fs = require('fs');

const checkCustomerAuth = require('./util/checkCustomerAuth');

const authRoutes = require('./routes/auth');
const resetRoutes = require('./routes/reset');
const paypalRoutes = require('./routes/paypal');
const userRoutes = require('./routes/user');
const ethRoutes = require('./routes/eth');
const downloadRoutes = require('./routes/download');
const streamRoutes = require('./routes/stream');
const orderRoutes = require('./routes/order');

const productRoutes = require('./routes/products');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use('/admin/upload', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, function (err, fields, files) {
    if (err) {
      next(err);
      return;
    }

    var oldpath = files.image.path;
    var newpath = path.join(__dirname, `../server/uploads/${files.image.name}`);

    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
  /*
      _id: new mongoose.Types.ObjectId(),
      product_id: 'ET01',
      artist_name: 'Shiro Schwarz',
      album_name: 'Under The Moonlight EP',
      description: "Let's spend the night together.",
      img_url: 'UnderTheMoonlight.jpg',
      price: 2,
      type: 'album',
      download_url: path.join(__dirname, `../server/music/Under The Moonlight EP.zip`),
      quantity: 1,
  */
});

app.use('/admin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let response = {
    result: 'success',
    token: 'oidioenfe3029u390423jnfasnfjksan',
  };

  res.status(200).json(response);
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reset', resetRoutes);
app.use('/api/v1/user', checkCustomerAuth, userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/stream', checkCustomerAuth, streamRoutes);
app.use('/api/v1/paypal', paypalRoutes);
app.use('/api/v1/download', checkCustomerAuth, downloadRoutes);
app.use('/api/v1/order', checkCustomerAuth, orderRoutes);

app.use('/eth', checkCustomerAuth, ethRoutes);

app.get('/*', function passHTML(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(config.port);

console.log(`ET3-Server is listening on http://localhost:${config.port}`);
