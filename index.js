require('http')
.Server((req, res) => {



const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain; charset=UTF-8'
};
res.writeHead(200, CORS);
if (req.url === '/login/') return res.end('alexmavlyanov95');
if (req.url === '/login') return res.end('alexmavlyanov95');
if (req.url === '/sample/') return res.end('\nfunction task(x) {\n  return x * this ** 2;\n}');
if (req.url === '/sample') return res.end('\nfunction task(x) {\n  return x * this ** 2;\n}');

res.end('test');
})
.listen(process.env.PORT);