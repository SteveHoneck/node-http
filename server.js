const http = require('http'); //To create a basic server, import the Node core module HTTP using the 'require' function

const hostname = 'localhost'; //set "hostname"
const port = 3000; //set "port"

const path = require('path'); //Node core module
const fs = require('fs'); //Node core module

//setting up the server
const server = http.createServer((req, res) => { //"http.createServer" is built in method from "http" module. Creates a basic server object. Takes a request handler callback function as a parameter which is created in-line here as an arrow function. The request handler is called everytime the server recieves a request. The request handler takes 2 objects as parameters: request and response (req, res).  We do not create the response object ourselves, it is received and we edit it. "req" and "res" objects are special objects called streams. Streams do not transmit data all at once, but in chunks. Request object can come from any application (browser, software program) that can make an "http" request.
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') { //Only want the server to respond to requests with the "GET" method (just for practice's sake). Check if the "method" attribute of the "req" object is "GET". If it is a "GET" request, we want to examine the URL that was requested
        let fileUrl = req.url; //Set up local variable holding the contents of the request URL. 
        if (fileUrl === '/') { //If the request was just to the "localhost" hostname without specifying a URL about that, this will just contain a forward slash. If so, want to send user to index.html page.
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl); //Get absolute path of the file that is being requested & store it in this variable. "path.resolve" converts the path from a relative path to an absolute path. Requested file should be in the public folder and the relative path to that is "./public".
        const fileExt = path.extname(filePath); //Want the server to only grant requests for HTML files (for practice's sake), so use "path.extname" to see if requested file is an HTML file & store it in this variable.

        if (fileExt === '.html') { //We know that we have a get request for an HTML file, so check if the file even exists on the server.
            fs.access(filePath, err => { // "fs.access" method lets us know if the file is accessable. The "access" method takes 2 arguments: the file path that you want to check and a callback function. The callback function that thakes an error for an argument. "access" will automatically pass an error object to the second object if the file is not accessable, we are just naming that object "err" (follows standard of a callback function having and Error object as the first argument).
                if (err) { //If "err" is truthy, send back a 404 to client.
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return; //Add a "return" statement so that the code after this is not executed
                }
                res.statusCode = 200; 
                res.setHeader('Content-Type', 'text/html'); //Tells client to expect an html document

                fs.createReadStream(filePath).pipe(res); //use "fs.createReadStream" method to actually send the html file and give it a file path. This method takes care of reading the contents of the file that it is given in small chunks (similar to React lazy-loading). Take contents and pipe it using "pipe" method giving it the argument "res" which means we are sending it over to the response object. The "pipe" method is available on Node streams (which the response object is). When there are 2 stream objects (response object is one, "createReadStream" creates another), ".pipe" can send the information from one to another. This line pipes the data from reading the file located at "filePath" to the response stream so that the response object can now access the data. By default, "createReadStream" is finished, it will cause the response object to end so dont need the "res.end" method here.
            });
        } else { //If the file extension is not HTML, will enter this "else" block that will display an error 404 message since our server is only set up for "HTML" files. 
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else { //Any requests that are not "GET" will fall into this "else" block that will display an error 404 message since our server is only set up for "GET" requests.
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

//Server was created above, but now need to start it with the ".listen" method on the "server" variable that we set up
server.listen(port, hostname, () => { //pass in 2 arguments, "port" and "hostname" variables we set up. Add a 3rd argument, a callback function that will be executed when the server starts up (set up as an in-line arrow function)
    console.log(`Server running at http://${hostname}:${port}/`);
});