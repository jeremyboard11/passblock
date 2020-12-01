var Express = require("express");
var BodyParser = require("body-parser");
var Cors = require("cors");
var Mongoose = require("mongoose");
var Session = require("express-session");
const MongoStore = require("connect-mongo")(Session);
var App = Express();

App.use(BodyParser.json());

// Public Static Folder
    App.use(Express.static(__dirname+'/public'));

// Cors
    App.use(Cors());

// Static Pages Folder
    App.use('/pages', Express.static(__dirname+'/pages'));

// DB CONNECTION
    Mongoose.connect
    (
        "mongodb+srv://jeremy:qazzaqqq1@jeremy-wgt2r.mongodb.net/passblock?retryWrites=true&w=majority",
        { useNewUrlParser: true,useUnifiedTopology: true },
        () => console.log('\nConnected to database\n')
    );


// -------------------- ROUTES -------------------- //

var codeRoute = require('./code');
App.use('/code', codeRoute);

App.get('/', (req,res) => {
    res.sendFile(__dirname+'/pages/index.html');
});




// Run server
var portvar = process.env.PORT ? process.env.PORT : 5000;
App.listen(process.env.PORT || 5000, () => {
    console.log('\nServer running on port '+portvar);
});