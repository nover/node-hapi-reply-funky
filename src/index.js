const Hapi = require('hapi');
const request = require('request');

const server = new Hapi.Server();
const testUri = 'https://httpbin.org/delay/1';

function performRequest() {
  return request({
    method: 'GET',
    url: testUri
  });
}

server.connection({
  port: 5000
});

server.route({
  method: 'GET',
  path: '/promise/',
  handler: (req, reply) => {
    // Construct promise that on resolve returns the stream for hapi
    // Expected: Get headers and content into response
    // Outcome: We get headers but NO content
    const prom = new Promise(function (resolve, reject) {
      const response = performRequest();
      response.on('response', resolve);
      response.on('error', reject);
    });
    reply(prom);
  }
});

server.route({
  method: 'GET',
  path: '/immediate/',
  handler: (req, reply) => {
    // use set immediate to get us off the event loop and back in "immediately"
    // Expected: Get headers and content into response 
    // Outcome: We get headers but NO content
    const response = performRequest();
    response.on('error', reply);
    response.on('response', (responseStream) => {
      setImmediate(() => {
        reply(responseStream);
      });
    });
  }
});

server.route({
  method: 'GET',
  path: '/reply/',
  handler: (req, reply) => {
    // pipe stream to hapi
    // Expected: Get headers and content into response 
    // Outcome: As expected
    const response = performRequest();
    response.on('error', reply);
    response.on('response', reply);
  }
});

if (!module.parent) {
  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });

}

module.exports = server;
