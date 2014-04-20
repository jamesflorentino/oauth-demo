var Sequelize = require('sequelize');
var DataTypes = Sequelize;
var db = new Sequelize(process.env.DB_URL, {
    logging: false
});

db.User = db.import(__dirname + '/models/user');
db.AccessToken = db.import(__dirname + '/models/access_token');
db.RefreshToken = db.import(__dirname + '/models/refresh_token');
db.Client = db.import(__dirname + '/models/client');

// drop the entire db when on a local machine and run the test files in the test/ dir
if (!process.env.NODE_ENV) {
    db.drop();
}

db.sync()
.success(function() {
    console.log('connected :)');
})
.error(function(err) {
    console.log('connection failed...', err);
});

module.exports = db;
