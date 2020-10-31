require('http')
.Server((req, res) => {

const CORS = {
'Access-Control-Allow-Origin': '*',
'X-Author': 'alexmavlyanov95'
};
res.writeHead(200, CORS);
if (req.url === '/') return res.end('alexmavlyanov95');
res.end('test');
})
.listen(process.env.PORT);