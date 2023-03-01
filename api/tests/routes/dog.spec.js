/* eslint-disable import/no-extraneous-dependencies */

const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Race, Temperament, conn } = require('../../src/db.js');
// EXPECT ASSERTION: POSSIBLE CHAININGS:
// TO - BE- BEEN - IS - THAT - WHICH - AND - HAS - HAVE - WITH - AT - OF - SAME - BUT - DOES

const agent = session(app);

const race = {
  name: "Beagle",
  height: "15 - 20",
  weight: "40 - 50",
  lifeSpan: "10 - 12"
};

const temperament = {
  name: 'Active'
}

describe('Dogs Routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Race.sync({ force: true })
    .then(() => Race.create(race)));
  describe('GET /dogs', () => {
    it('should get status code 200', () =>
      agent.get('/api/dogs').expect(200)
    );
  });
});
describe('Temperaments Routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  }));
  beforeEach(() => Temperament.sync({force: true})
  .then(() => Temperament.create(temperament)))
  describe('Get /temperament code status', () => {
    it('Should get status code 200', () => {
      agent.get('/api/temperaments').expect(200);
    })
  })
})

//SUPERTEST:
// The get() method tells SuperTest that we’re using the HTTP GET verb. 
// You can chain additional methods into the call for setting authentication, custom HTTP headers or body, etc.
//  but this is not necessary for this example. The end() method finalizes the request and calls the API server.
//   As its parameter, it requires a callback function for handling the response.
// You need to set your expectations for a functional API test and confirm that the API responds as expected
// As you can see, expect() calls always come before end().
// Using async and await allows you to resolve the promise to get the API response more cleanly instead of resolving the promise through chaining.
// SuperTest is smart enough to check the content type from the response and appropriately parses the information into a JavaScript object. 
// It makes verifying your JSON APIs much easier to do since you don't have to worry about parsing the response.
