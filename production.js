const express = require('express');
const path = require('path');
const fs = require('fs');

//http://tracnity.com/
const app = express();
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  console.log('path ->', req.path);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use((req, res, next) => {
  console.log(req.path, 'and protocol', req.protocol);
  next();
});

app.listen(3000, () => {
  console.log('listening on 80');
});

