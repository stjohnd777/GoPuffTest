const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const {createService} = require("../src/gopuff/stem");
const {expect} = chai;

chai.use(chaiHttp);
chai.config.truncateThreshold = 0;


describe("Candidate Tests", () => {

    it('should return a list of words starting with "aar"', async () => {

        const app = await createService();
        /*
         This file is for your testing purposes and
         will not be part of your final submission.
         */


        const stem = "aar";
        const res = await chai.request(app)
            .get("/")
            .query({stem: stem});

        const expected = {
            "data": [
                'aardvark',
                'aardvarks',
                'aardwolf',
                'aardwolves',
                'aargh',
                'aaron',
                'aaronic',
                'aaronical',
                'aaronite',
                'aaronitic',
                'aarrgh',
                'aarrghh',
                'aaru'
            ]
        };

        try {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body, "response.body").to.be.a("object");
            expect(res.body.data, "response.body.data").to.be.a("array");
            expect(res.body.data, "response.body.data").to.deep.equal(expected.data);
        }
        catch (err) { throw err; }
    });
});