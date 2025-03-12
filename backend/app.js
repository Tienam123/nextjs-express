require("dotenv").config();
const path = require('node:path');
const express = require('express');
const cors = require('cors');
const routes = require("./routes");


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/',routes)
app.get('/api',(req, res, next) => {
  res.status(200).send('Hello from ')
})

module.exports = app;