// existing codes: l0l1 expired:false, b00b expired:true, h3ll0 expired:false
var Express = require('express');
var Router = Express.Router();
const Mongoose = require("mongoose");
var Bcrypt = require('bcrypt');

Mongoose.set('useFindAndModify', false);

var CodeModel = require('./Models/code');
var DataModel = require('./Models/data');

function parseCode(code, hash){
    var pass = Bcrypt.compareSync(code, 10);
    return pass;
}

function addTry(){
    DataModel.findOneAndUpdate({_id:"5fc67d5bbe9d3fad04b3723a"},{$inc : {'tries' : 1}}).exec();
}

Router.post('/generate', (req,res) => {
    if(req.query.code && req.query.code.length >= 4){
        res.send(Bcrypt.hashSync(req.query.code,10));
    }else{
        res.send("Code has to be at least 4 characters");
    }
});

Router.get('/tries', (req,res) => {
    DataModel.findOne({}, (err,data) => {
        res.json({
            tries:data.tries
        });
    });
});

Router.get('/', (req,res) => {
    res.send("Routes available: guess");
});

Router.get('/guess', async (req,res) => {
    if(req.query.code)
    {
        await CodeModel.find({expired:false}, (err,result) => {
            var winner = false;
            var giftcardcode = "";
            result.forEach(d => {
                var parse = Bcrypt.compareSync(req.query.code, d.code);
                if(parse)
                {
                    winner = true;
                    giftcardcode = d.giftcard;
                }
            });
            if(winner)
            {
                res.json({win:true, message: "You won!", giftcard: giftcardcode});
            }else{
                res.json({win:false, message: "Dang, you lost"});
                addTry();
            }

        });
    }
    else
    {
        res.send("Code string required");
    }
});




module.exports = Router;