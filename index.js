import fs from 'fs';
import crypto from 'crypto';
import http from 'http';
import express from 'express';

import bodyParser from 'body-parser';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs, crypto, http);
const port = process.env.PORT || 3000;


// app.use(cors());



app.listen(port, () => {
  console.log('Server is up!');
});