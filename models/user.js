module.exports = function(db, DataTypes) {
    return db.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            notNull: true
        },
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            notNull: true,
            isEmail: true
        }
    });
};
