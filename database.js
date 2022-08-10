const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('survey_db', 'root', '', {
    dialect: 'sqlite',
    host: './dev.sqlite',
})

module.exports = sequelize;