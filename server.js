
// This is where the server functionality lives

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded( {extended: true} ));
app.use(express.json());