'use strict'

//temporary location for mock env vars
process.env.PORT = 7000

const testServer = require('../lib/server.js')

describe('Server Tests', () => {
    describe('_ERROR_ server already on', () => {
      test('Expect error to throw when starting server twice', () => {
        testServer.start(process.env.PORT, () => {
            console.log(`Listening on ${process.env.PORT}`)
        });
        testServer.start(process.env.PORT, err => {
            expect(err).toBeInstanceOf(Error)
        });
        testServer.stop();
      });
    });
    describe('_ERROR_ server already off', () => {
      test('Expect error to throw when stopping server that is not running', () => {
        return testServer.stop(err => {
            expect(err).toBeInstanceOf(Error)
        });
      });
    });
  });