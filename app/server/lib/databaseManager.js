const mongoose = require('mongoose');

module.exports = class DatabaseManager {

    constructor() {
        this.connected = false;
        mongoose.Promise = global.Promise;
        // Connect MongoDB at default port 27017.
        mongoose.connect('mongodb://localhost:27017/weather', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }, (err) => {
            if (!err) {
                console.log('MongoDB Connection Succeeded.')
            } else {
                console.log('Error in DB connection: ' + err)
            }
        });
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function() {
            // we're connected!
            this.connected = true;
        });
    }

}