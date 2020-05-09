// Sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.CUBEJS_DB_NAME, process.env.CUBEJS_DB_USER, process.env.CUBEJS_DB_PASS, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});

const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = User;
