const { DataTypes } = require('sequelize');
sequelize = require('../db.js');

const Task = sequelize.define('Task', {
  // Define model fields and data types
  
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate : {
      len: [3, 255]
    }
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_done: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
    timestamps: false,
    tableName: 'task'
});


module.exports = Task;