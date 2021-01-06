const axios = require("axios");
const express = require("express");

let DICTIONARY;

const dictionaryURL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt";

let MAP = new Map()

let indexer = [ ... 'abcdefghijklmnopqurtuvwxyz']
let InitMap = ()=>{
    indexer.forEach (c =>{
        let index = IndexOfStartWith(DICTIONARY,c)
        console.log ( IndexOfStartWith(DICTIONARY,c) );
        MAP.set(c,index);
    })
}

// get the list from url and cache the results,
// then partition the index in MAP by the indexer
let InitDictionary = async ()=> {

    let res= await  axios.get(dictionaryURL);

    if ( res.status ==200) {
        let data = res.data;
        data = data.split('\r\n');
        DICTIONARY = data;
        InitMap();
        return data;
    }else {
        throw new Error('could not get dictionary');
    }
}

// match words in sorted list by prefex
let IndexOfStartWith = (array,stem, offset=0)=>{
    let index = 0;
    let len = DICTIONARY.length
    for ( let index = offset ;  index <  len; index++){
        let value = DICTIONARY[index];
        if ( value.startsWith(stem )){
            return index;
        }
    }
    return -1;
}

// words that match the stem
let GetMatchingWords = (stem)=>{
    let data = []
    let offest = MAP.get(stem.charAt(0));
    let index = IndexOfStartWith( DICTIONARY,stem,offest);
    if ( index != -1) {
        while ( DICTIONARY[index].startsWith(stem)) {
            data.push(DICTIONARY[index]);
            index++;
        }
    }
    return data;
}

// stand up route
let CreateStemServiceRoute =   (app)=>{
    // set up route / query param contains stem
    let router = express.Router();
    router.get("/",  (req,res,next)=>{
        // remove white space
        let stem = req.query.stem.trim();
        let matchedItems =  GetMatchingWords(stem);
        // return 404 is no matches
        res.status =  matchedItems.length > 0 ? res.status(200) : res.status(404);
        res.json( {data : matchedItems  });
    });
    app.use('/', router);

}

// create the service
const createService = async () => {

    const app = express();
    /* go ahead and code! */

    // Get the sorted dictionary
    DICTIONARY  = await InitDictionary(dictionaryURL)

    CreateStemServiceRoute(app);

    return app;
};

module.exports = {createService,GetMatchingWords, IndexOfStartWith , InitDictionary, MAP}


const chai = require("chai");
const chaiHttp = require("chai-http");
const {expect} = chai;
chai.use(chaiHttp);
chai.config.truncateThreshold = 0;



