const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('temperament', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false
  });
};