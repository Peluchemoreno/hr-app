const http = require('http');
const employeeService = require('./lib/employees');
const responder = require('./lib/responseGenerator')
const staticFile = responder.staticFile(`/public`);


http.createServer((req, res) => {
  let _url; //a parsed url in case there are parameters


  // In case the client uses lower case for methods
  req.method = req.method.toUpperCase();
  console.log(`${req.method} ${req.url}`)

  if (req.method !== "GET") {
    res.writeHead(501, { 'Content-Type': 'text/plain' });
    return res.end(`${req.method} is not implemented by this server`)
  }

  

//_url = /^\/employees$/i.exec(req.url)

  if (_url = /^\/employees$/i.exec(req.url)) {
    employeeService.getEmployees((error, data) => {
      if (error) {
        responder.send500(error, res)
      }

      responder.sendJson(data, res)

    })

// _url = /^\/employees\/(\d+)$/i.exec(req.url)

  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    employeeService.getEmployee(_url[1], (error, data) => {
      if (error) {
        responder.send500(error, res)
      } else if (!data) {
        responder.send404(res)
      }
      responder.sendJson(data, res)
    })
    
  } else {
    res.writeHead(200)

    staticFile('/home.html', res)
  }

  // res.end(`The current time is ${Date.now()}`)
}).listen(8080, "127.0.0.1")

console.log(`The server is running at http://127.0.0.1:8080/`)

