module.exports = function(db, DataTypes) {
    return db.define('AccessToken', {
        accessToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            unique: true
        },
        expires: DataTypes.DATE
    });
};
