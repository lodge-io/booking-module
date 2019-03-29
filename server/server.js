const express = require('express');
const db = require('../database/DbManager.js');


const app = express();
const port = 3000;


app.get('/listings/:listingId', (req, res) => {
  console.log(req.params.listingId);
  db.readListing(req.params.listingId).then((a) => {
    console.log(a);
    res.end(JSON.stringify(a));
  });
});

app.listen(port, () => {
  console.log('Running on port:', port);
});
