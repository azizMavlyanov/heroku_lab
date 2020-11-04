// require('http')
// .Server((req, res) => {



// const CORS1 = {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'text/plain; charset=UTF-8'
// };
// res.writeHead(200, CORS1);
// if (req.url === '/login/') return res.end('alexmavlyanov95');
// if (req.url === '/login') return res.end('alexmavlyanov95');
// if (req.url === '/promise/') return res.end('\nfunction task(x) {\n  return x * this ** 2;\n}');
// if (req.url === '/promise/') return res.end('function task(x){ return new Promise(function(resolve, reject) { if (x < 18) {resolve("yes")} else {reject("no")}});}');
// if (req.url === '/promise') return res.end('function task(x){ return new Promise(function(resolve, reject) { if (x < 18) {resolve("yes")} else {reject("no")}});}');

// if (req.url === '/fetch/' || req.url === '/fetch') {

//     const CORS2 = {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'text/html; charset=UTF-8'
//     };

//     res.writeHead(200, CORS2);


//     return res.end(`<input type="text" id="inp"><button id="bt" onclick="fetch(document.getElementById('inp').value).then(response1 => response1.text()).then(response2 => document.getElementById('inp').value = response2)">submit</button>`);
// }

// res.end('test');
// })
// .listen(process.env.PORT);

// fetch(`${document.getElementById("inp").value}`).then(response1 => response1.text()).then(response2 => document.getElementById("inp").value = response2);

const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const publicPath = path.join(__dirname);
const port = process.env.PORT || 3000;

app.use(cors());

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});
app.use(bodyParser.json());

app.all('/result4/', (req, res) => {
  
  const x_test = req.headers["x-test"];

  console.log(req.rawBody);

  if (x_test && req.rawBody) {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "x-text, x-test, Content-Type");
    res.json({message: "alexmavlyanov95", "x-result": x_test, "x-body": req.rawBody});
  } else {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "x-text, x-test");
    res.json({message: "alexmavlyanov95", "x-result": x_test});
  }

  res.json({message: "alexmavlyanov95"});

});

app.all('/result4', (req, res) => {
  
  const x_test = req.headers["x-test"];

  console.log(req.rawBody);

  if (x_test && req.rawBody) {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "x-text, x-test, Content-Type");
    res.json({message: "alexmavlyanov95", "x-result": x_test, "x-body": req.rawBody});
  } else {
    res.setHeader("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers", "x-text, x-test");
    res.json({message: "alexmavlyanov95", "x-result": x_test});
  }

  res.json({message: "alexmavlyanov95"});

});

app.listen(port, () => {
  console.log('Server is up!');
});