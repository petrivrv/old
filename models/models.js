const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Shop = sequelize.define('shop', {
    
    id : { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name : { type: DataTypes.STRING, unique:true, allowNull:false }
  } );

  
const Good = sequelize.define('good', {
    
    id : { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name : { type: DataTypes.STRING, allowNull:false },
    price: {type: DataTypes.INTEGER, allowNull:false },
    shopid : { type: DataTypes.INTEGER, allowNull:false},
    img : { type: DataTypes.STRING }
  } );

  const Order = sequelize.define('order', {
    
    id : { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name : { type: DataTypes.STRING , allowNull:false },
    totalprice: {type: DataTypes.INTEGER },
    email : { type: DataTypes.STRING , allowNull:false },
    phone : { type: DataTypes.STRING , allowNull:false },
    address : { type: DataTypes.STRING , allowNull:false }
  } );

  

  module.exports = {Shop, Good, Order}