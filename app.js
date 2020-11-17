export default function getApp(express, bodyParser, fs, crypto, https) {
    let app = express();
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        next()});
    
    app.all('/login/', (req, res) => {
        res.send('alexmavlyanov95');
    });

    app.all('/code/', (req, res) => {
        let pathToFile = import.meta.url.substring(7);

        fs.readFile(pathToFile, (err, data) => {
            res.send(data);
        })
    });

    app.all('/sha1/:input/', (req, res) => {
        let {input} = req.params;
        res.setHeader('content-type', 'text/plain');
        res.send(crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex'));
    });

    app.all('/req/', (req, res) => {
        let {addr} = req.query;
        if (req.method === "POST" && req.body.addr) {
            addr = req.body.addr;
        }

        https.get(addr, (response) => {
            response.setEncoding('utf8');
            let rawData = '';
            response.on('data', (chunk) => { rawData += chunk; });
            response.on('end', () => {
                try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                res.send(JSON.stringify(parsedData));
                } catch (e) {
                console.error(e.message);
                }
            });
            }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            });
        
    });

    app.all('*', (req, res) => {
        res.send('alexmavlyanov95');
    });

    return app;
}