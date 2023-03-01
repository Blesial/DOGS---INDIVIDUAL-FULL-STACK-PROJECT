const { Race, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');
const e = require('express');

//

describe("Race model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
});
describe("Validators", () => {
  beforeEach(() => Race.sync({ force: true }));
  describe("name", () => {
    it("Should throw an Error if name is null", (done) => {
      Race.create({ name: null })
        .then(() => done(new Error("It requires a valid name")))
        .catch(() => done());
    });
    it("Should work with a valid name", () => {
      Race.create({ name: "Pug" });
    });
    it("Can not be created without all the fields completed", (done) => {
      Race.create({ height: "4 - 25", weight: "4 - 23"})
        .then(() => done("Some fields are incompleted"))
        .catch(() => done());
    });
    it('CreatedInDatabase attribute must be a boolean', async () => {
     let race = await Race.create({name: "chona", height: "10 - 20", weight: "40 - 50", lifeSpan: "10 - 12"})
      expect(typeof race.createdInDataBase).equal('boolean');
    })
  });
});
describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
});
describe("Validators", () => {
  beforeEach(() => Temperament.sync({ force: true }));
  describe("id/name", () => {
    it("Temperament should have an unique ID", (done) => {
      Temperament.create({ id: "1" })
        .then(() => done())
        .catch(() => done(new Error('ID repited')))
    })
    it("Name must be a String", () => {
      expect(typeof Temperament.name).equal("string");
    });
  });
});
