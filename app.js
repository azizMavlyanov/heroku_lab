export default (express, bodyParser, fs, crypto, http) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        next()});

    app
    .get('/login/', (req, res) => res.send('alexmavlyanov95'))
    .get('/code/', (req, res) => fs.createReadStream(import.meta.url.substring(7)).pipe(res))
    .get('/sha1/:input/', (req, res) => {
        const {input} = req.params;
        res.setHeader('content-type', 'text/plain');
        res.send(crypto.createHash('sha1').update(input).digest('hex'));
    })
    .get('/req', (req, res) => {
        res.setHeader('content-type', 'text/plain');

        let {addr} = req.query;

        http.get(addr, (response) => {
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
        
    })
    .post('/req', (req, res) => {
        res.setHeader('content-type', 'text/plain');

        let addr = req.body.addr;

        http.get(addr, (response) => {
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
    })
    .all('*', (req, res) => {
        res.send('alexmavlyanov95');
    });

    // app.get('/login/', (req, res) => {
    //     res.send('alexmavlyanov95');
    // });

    // app.get('/code/', (req, res) => {
    //     let pathToFile = import.meta.url.substring(7);

    //     fs.readFile(pathToFile, (err, data) => {
    //         res.send(data);
    //     })
    // });

    // app.get('/req', (req, res) => {
    //     res.setHeader('content-type', 'text/plain');

    //     let {addr} = req.query;

    //     http.get(addr, (response) => {
    //         response.setEncoding('utf8');
    //         let rawData = '';
    //         response.on('data', (chunk) => { rawData += chunk; });
    //         response.on('end', () => {
    //             try {
    //             const parsedData = JSON.parse(rawData);
    //             console.log(parsedData);
    //             res.send(JSON.stringify(parsedData));
    //             } catch (e) {
    //             console.error(e.message);
    //             }
    //         });
    //         }).on('error', (e) => {
    //         console.error(`Got error: ${e.message}`);
    //         });
        
    // });

    // app.post('/req', (req, res) => {
    //     res.setHeader('content-type', 'text/plain');

    //     let addr = req.body.addr;

    //     http.get(addr, (response) => {
    //         response.setEncoding('utf8');
    //         let rawData = '';
    //         response.on('data', (chunk) => { rawData += chunk; });
    //         response.on('end', () => {
    //             try {
    //             const parsedData = JSON.parse(rawData);
    //             console.log(parsedData);
    //             res.send(JSON.stringify(parsedData));
    //             } catch (e) {
    //             console.error(e.message);
    //             }
    //         });
    //         }).on('error', (e) => {
    //         console.error(`Got error: ${e.message}`);
    //         });
    // })

    // app.all('*', (req, res) => {
    //     res.send('alexmavlyanov95');
    // });

    return app;
}