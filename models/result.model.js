const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');
const testModel = require('./test.model');

const Result = sequelize.define('results', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Store the user's answers as JSON
  answers: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

  testId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: testModel,
      key: User.id,
    },
  },
});

Result.belongsTo(User, { foreignKey: 'userId' });

module.exports = Result;
