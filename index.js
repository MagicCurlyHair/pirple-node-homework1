const http = require('http');

const server = http.createServer((req, res) => {
  handleRequests(req, res);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

function handleRequests(req, res) {
  const method = req.method.toUpperCase();
  const trimmedPath = req.url.replace(/^\/+|\/+$/g, '');
  const chosenHandler = routes[trimmedPath] || handlers.notFound;
  const data = {
    method
  };
  chosenHandler(data, (statusCode, payload) => {
    const resPayload = payload || {};
    res.writeHead(statusCode, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(resPayload));
    res.end();
  })
}

const handlers = {};

handlers.hello = (data, callback) => {
  if (data.method !== 'POST') {
    return callback(400);
  }
  callback(200, {message: 'Hello World'});
};
handlers.notFound = (data, callback) => {
  callback(404);
}

const routes = {
  hello: handlers.hello
};
