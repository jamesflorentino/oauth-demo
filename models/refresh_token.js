module.exports = function(db, DataTypes) {
    return db.define('RefreshToken', {
        refreshToken: DataTypes.STRING,
        clientId: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        expires: DataTypes.DATE
    });
};
