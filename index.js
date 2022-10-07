const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");


const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all("/dishes", (req,res, next) => {
     res.statusCode = 200;
     res.setHeader("Content-Type", "text/plain");
     next(); // continue to look for additional specs matching the /dishes endpoint
});

app.get("/dishes", (req, res, next) => {
     res.end("Will send all the dishes to you");
});

app.post("/dishes", (req, res, next) => {
     res.end("Will add the dish: " + req.body.name + " with details: "+ req.body.description);
});
app.put("/dishes", (req, res, next) => {
     res.statusCode = 403
     res.end("put operation not allowed on /dishes");
});
app.delete("/dishes", (req, res, next) => {
     res.end("Deleting all the dishes!");
});


app.get("/dishes/:dishId", (req, res, next) => {
     res.end("Will send the detailes of the dish " + req.params.dishId + "to you!");
});

app.post("/dishes/:dishId", (req, res, next) => {
     res.statusCode = 403
     res.end("POST operation not allowed on /dishes/" + req.params.dishId);
});
app.put("/dishes/:dishId", (req, res, next) => {
     res.write("updating the dish: "+ req.params.dishId); // add a line to the reply message
     res.end("Will update the dish: " + req.params.dishId + " with details: "+ req.body.description);
});
app.delete("/dishes/:dishId", (req, res, next) => {
     res.end("deleting the dish: "+ req.params.dishId)
});
// serve up static files
app.use(express.static(__dirname + '/public'));

// express uses additional middleware => 
// the NEXT parameter is used when you want to invoke additional middleware on your behalf
app.use((req, res, next) => {
     // console.log(req.headers)
     res.statusCode = 200;
     res.setHeader("Content-Type", "text/html")
     res.end("<html><body><h1>This is an Express Server</h1></body></html>")
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
     console.log(`Server running at http://${hostname}:${port}`)
})