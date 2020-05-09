// Sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.CUBEJS_DB_NAME, process.env.CUBEJS_DB_USER, process.env.CUBEJS_DB_PASS, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});

const Payment = sequelize.define("payment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    segment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profit: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
module.exports = Payment;
