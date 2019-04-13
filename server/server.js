const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');
const db = require('../database/DbManager.js');


const app = express();
const port = 3000;

app.use(cors());

app.use('/', expressStaticGzip('client/dist/', {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));
app.use(bodyParser.json());

app.get('/listings/:listingId', (req, res) => {
  db.readListing(req.params.listingId)
    .then((a) => {
      console.log('read successful, id:', req.params.listingId);
      res.end(JSON.stringify(a));
    })
    .catch((e) => {
      console.log(e);
    });
});

app.delete('/listings/:listingId', (req, res) => {
  db.deleteListing(req.params.listingId)
    .then((a) => {
      res.end(JSON.stringify(a));
    })
    .catch((e) => {
      console.log(e);
      res.end(JSON.stringify(e));
    });
});

app.post('/listings', (req, res) => {
  db.createListing(req.body).then((a) => {
    res.end(a);
  });
});

app.listen(port, () => {
  console.log('Running on port:', port);
});
