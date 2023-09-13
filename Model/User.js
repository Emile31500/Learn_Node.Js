const { DataTypes } = require('sequelize');
sequelize.define('../db.js');

const User = sequelize.define('User', {
  // Define model fields and data types
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      len: [3, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate : {
      len: [3, 255]
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      len: [3, 255]
    }
  }
});

module.exports = User;