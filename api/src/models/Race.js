const { DataTypes, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('race', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "SantasLittleHelper",
      },
      height: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.50,
        get() {
          let heightGet = this.getDataValue('height');
          return heightGet + ' inches at the shoulder'
        }
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 20,
        get() {
  let weightGet = this.getDataValue('weight');
  return weightGet + ' pounds';
      }
    },
      age: {
        type: DataTypes.SMALLINT,
        get() {
  let nullAge = this.getDataValue('age');
  return nullAge ? nullAge + ' years' : null;
      }
    }}, {
      timestamps: false
    });
  };

