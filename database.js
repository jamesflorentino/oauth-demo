var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DB_URL, {
    logging: false
});

db.User = db.define('User', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        notNull: true
    },
    password: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true,
        notNull: true,
        isEmail: true
    }
});

db.AccessToken = db.define('AccessToken', {
    accessToken: Sequelize.STRING,
    clientId: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        unique: true
    },
    expires: Sequelize.DATE
});

db.RefreshToken = db.define('RefreshToken', {
    refreshToken: Sequelize.STRING,
    clientId: Sequelize.STRING,
    userId: Sequelize.INTEGER,
    expires: Sequelize.DATE
});

db.Client = db.define('Client', {
    clientId: {
        type: Sequelize.STRING,
        unique: true
    },
    clientSecret: Sequelize.STRING,
    clientType: {
        type: Sequelize.ENUM,
        values: ['public', 'confidential', 'web_application', 'native_application'],
        defaultValue: 'public'
    },
    userId: Sequelize.INTEGER,
    redirectUri: Sequelize.STRING
});

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
