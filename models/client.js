module.exports = function(db, DataTypes) {
    return db.define('Client', {
        clientId: {
            type: DataTypes.STRING,
            unique: true
        },
        clientSecret: DataTypes.STRING,
        clientType: {
            type: DataTypes.ENUM,
            values: ['public', 'confidential', 'web_application', 'native_application'],
            defaultValue: 'public'
        },
        userId: DataTypes.INTEGER,
        redirectUri: DataTypes.STRING
    });
};
