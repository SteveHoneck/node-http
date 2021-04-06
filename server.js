const http = require('http'); //To create a basic server, import the Node HTTP module using the 'require' function

const hostname = 'localhost'; //set "hostname"
const port = 3000; //set "port"

//setting up the server
const server = http.createServer((req, res) => { //"http.createServer" is built in method from "http" module. Creates a basic server object. Takes a request handler callback function as a parameter which is created in-line here as an arrow function. The request handler is called everytime the server recieves a request. The request handler takes 2 objects as parameters: request and response (req, res).  We do not create the response object ourselves, it is received and we edit it. "req" and "res" objects are special objects called streams. Streams do not transmit data all at once, but in chunks. Request object can come from any application (browser, software program) that can make an "http" request.
    console.log(req.headers); //Gives us access to the headers in the request object
    res.statusCode = 200; //Add "statusCode" property with value of "200" (everything okay) to the already existing response object that was passed into the function
    res.setHeader('Content-Type', 'text/html'); //Set up a header for the response object using built in method that takes 2 arguments. "Content-Type" tells the client what type of data to expect in the response body, "text/html" is the value for the header. Use 'text/html' anytime sending html in the body 
    res.end('<html><body><h1>Hello World!</h1></body></html>'); //Enter response body message in html & close response stream at the same time using this built-in method.
});

//Server was created above, but now need to start it with the ".listen" method on the "server" variable that we set up
server.listen(port, hostname, () => { //pass in 2 arguments, "port" and "hostname" variables we set up. Add a 3rd argument, a callback function that will be executed when the server starts up (set up as an in-line arrow function)
    console.log(`Server running at http://${hostname}:${port}/`);
});