const {Sequelize} = require('sequelize');



const DB_NAME = 'sql8503723';
const DB_USER =  'sql8503723';
const DB_PASSWORD = 'zdu59VQ5VG';
const DB_HOST = 'sql8.freemysqlhosting.net';
const DB_PORT = '3306';


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect:  'mysql',
    port: DB_PORT
  });

module.exports = sequelize; 