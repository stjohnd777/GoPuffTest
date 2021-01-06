const {createService, GetMatchingWords, InitDictionary,MAP} =  require ("../src/gopuff/stem");
const chai = require("chai");

async function main(){

    let DATA = await InitDictionary();

    console.log(DATA);

    console.log(MAP);

    let list = GetMatchingWords('arr')

    console.log(list);

    list = GetMatchingWords('arrrrrrrrrrr')

    let app = await createService();

    const req = "/";
    const stem = "aar";
    const res = await chai.request(app)
        .get(req)
        .query({stem: stem})

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

    console.log(res.body)

    try {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body, "response.body").to.be.a("object");
        expect(res.body.data, "response.body.data").to.be.a("array");
        expect(res.body.data, "response.body.data").to.deep.equal(expected.data);
    }
    catch (err) { throw err; }



    let stem2 = "nu";
    let res2 = await chai.request(app)
        .get("/")
        .query({stem: stem2})

    console.log(res2)
    console.log(res2.body)
    console.log(res2.status)

}

main();