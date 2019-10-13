module.exports = function(){
    const mongoose = require('mongoose');
    // init connect
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    });
    // notice connect
    var db = mongoose.connection;
    // error connect
    db.on('error', console.error.bind(console, 'ERROR: '));
    // successs connetc
    db.once('open', function(){
        console.log('Success');
    })
}