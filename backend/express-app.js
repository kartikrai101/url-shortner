const express = require('express');
const cors  = require('cors');
const connection = require('./database');
const { v4: uuidv4 } = require('uuid');
const referenceTable = require('./referenceTable');

module.exports = async (app, database) => {

    //middlewares
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors({origin: "*"}));
    app.use(express.static(__dirname + '/public'))

    // APIs
    app.get('/shortify/:hashValue', (req, res) => {
        const shortUrl = 'http://localhost:8000/shortify/' + req.params.hashValue;
        // find the ogUrl corresponding to this short url in our database
        connection.query('SELECT * FROM Container WHERE shortUrl=?', [shortUrl], (err, rows) => {
            if(err) console.log(err);
            else{
                const ogUrl = rows[0].longUrl;
                res.status(200).json({
                    "success": true,
                    "ogUrl": ogUrl
                })
                //res.redirect(ogUrl);
            }
        })
    })

    app.post('/shortify/postUrl', (req, res) => {
        const ogUrl = req.body.url;
        //console.log(ogUrl);

        // check if a short url corresponsing to this URL exists already
        connection.query(`SELECT * FROM Container WHERE longUrl=?`, [ogUrl], (err, rows)  => {
            if(err){
                console.log(err);
            }else{
                if(rows.length === 0){
                    // means that the given url is not present in the database
                    
                    // generate the short-url for this input url

                    // Step-1: Generate a unique ID for the new URL entry
                    const uuid = uuidv4();
                    var numericID = 1;
                    for(let i=0; i<uuid.length; i++){
                        let ch = uuid[i];
                        let val = ch.charCodeAt(0);
                        if(val >= 48 && val <= 57){
                            numericID += (val - 48);
                        }else if(val >= 65 && val <= 90){
                            numericID += (val - 65 + 11);
                        }else if(val >= 97 && val <= 122){
                            numericID += (val - 97 + 73);
                        }
                    }
                    const salt = Math.ceil(Math.random()*100)*23*7;
                    numericID = numericID * salt;

                    // Step - 2: Base 62 conversion
                    var genHashVal ="";
                    let dummyId = numericID;
                    while(dummyId > 0){
                        const rem = dummyId % 62;
                        genHashVal += referenceTable[rem];
                        //console.log(rem);
                        dummyId = Math.floor(dummyId/62);
                    }
                    // we have generated the short hashValue
                    const hashValue = genHashVal;

                    // Step-3: Generate your own short url from this hashed value
                    var shortUrl = "http://localhost:8000/shortify/" + hashValue;
                    //console.log(shortUrl);

                    // Step-4: Save this shortUrl with the ogUrl in the db
                    connection.query("INSERT INTO Container (longUrl, shortUrl) VALUES (?)", [[ogUrl, shortUrl]], (err, rows) => {
                        if(err){console.log(err)}
                        else{console.log(rows)}
                    })

                    res.status(200).json({
                        "message": "Inserted the new URL",
                        "shortUrl": shortUrl,
                        "longUrl": ogUrl
                    })
                }else{
                    res.status(200).json({
                        "message": "URL already shortified!",
                        "shortUrl": rows[0].shortUrl,
                        "longUrl": ogUrl
                    })
                }
            }
        })
    })
}