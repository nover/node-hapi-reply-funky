const expect = require('unexpected');
const Hapi = require('hapi');

describe('HAPI stream handling', function () {
  let server = null;
  beforeEach(() => {
    server = require('../src');

  });

  it('should work with pipe to reply', function (done) {
    this.timeout(2000);
    server.inject({ method: 'GET', url: '/reply/'}, (res) => {
      expect(res.statusCode, 'to be', 200);
      expect(res.result, 'to be non-empty')
      expect(JSON.parse(res.result), 'to satisfy', {
        url: 'https://httpbin.org/delay/1'
      });
      done();
    })
  });
  it('should work with promise to reply', function (done) {
    this.timeout(2000);
    server.inject({ method: 'GET', url: '/promise/'}, (res) => {
      expect(res.statusCode, 'to be', 200);
      expect(res.result, 'to be non-empty')
      expect(JSON.parse(res.result), 'to satisfy', {
        url: 'https://httpbin.org/delay/1'
      });
      done();
    })
  });

  it('should work with setImmediate and pipe to reply', function (done) {
    this.timeout(2000);
    server.inject({ method: 'GET', url: '/immediate/'}, (res) => {
      expect(res.statusCode, 'to be', 200);
      expect(res.result, 'to be non-empty')
      expect(JSON.parse(res.result), 'to satisfy', {
        url: 'https://httpbin.org/delay/1'
      });
      done();
    })
  });
})
