const http = require('http');
const employeeService = require('./lib/employees');


http.createServer((req, res)=>{
  let _url; //a parsed url in case there are parameters


  // In case the client uses lower case for methods
  req.method = req.method.toUpperCase();
  console.log(`${req.method} ${req.url}`)

  if (req.method !== "GET"){
    res.writeHead(501, {'Content-Type': 'text/plain'});
    return res.end(`${req.method} is not implemented by this server`)
  }

  if (_url = /^\/employees$/i.exec(req.url)){
    employeeService.getEmployees((error, data)=>{
      if (error) {
        res.writeHead(500);
        res.end(`there was an error ${error}`)
      } 

      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data))

    })
    // res.writeHead(200);
    // return res.end()
  } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)){
    employeeService.getEmployee(_url[1], (error, data)=>{
      if (error){
        res.writeHead(500);
        res.end(`There was an error ${error}`)
      } else if (!data){
        res.writeHead(404);
        res.end(`NO such resource`)
      }
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(JSON.stringify(data))
    })
    res.writeHead(200)
    return res.end('a single employee')
  } else {
    res.writeHead(200)
    res.end('a static file')
  }

  // res.end(`The current time is ${Date.now()}`)
}).listen(8080, "127.0.0.1")

console.log(`The server is running at http://127.0.0.1:8080/`)