const express = require('express');
const db = require('../database/DbManager.js');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(express.static('client/dist'));
app.use(bodyParser.json());

app.get('/listings/:listingId', (req, res) => {
  console.log(req.params.listingId);
  db.readListing(req.params.listingId).then((a) => {
    console.log(a);
    res.end(JSON.stringify(a));
  });
});

app.delete('/listings/:listingId', (req, res) => {
  db.deleteListing(req.params.listingId)
    .then((a) => {
      console.log(a);
      res.end(JSON.stringify(a));
    })
    .catch((e) => {
      console.log(e);
      res.end(JSON.stringify(e));
    });
});

app.post('/listings', (req, res) => {
  console.log(req.body, ' is body');
  db.createListing(req.body).then((a) => {
    console.log(a);
    res.end(a);
  });
});

app.listen(port, () => {
  console.log('Running on port:', port);
});
