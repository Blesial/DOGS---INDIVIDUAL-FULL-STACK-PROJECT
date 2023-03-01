const { DataTypes, Sequelize } = require('sequelize');


module.exports = (sequelize) => {
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '0.50',
        get() {
          let heightGet = this.getDataValue('height');
          return heightGet + ' inches at the shoulder'
        }
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
  //       get() {
  // let weightGet = this.getDataValue('weight');
  // return weightGet + ' Kgs';
  //     }
    },
      lifeSpan: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
  let nullAge = this.getDataValue('lifeSpan');
  return nullAge ? nullAge + ' years' : null;
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOjpmp76GuSrmOgVzaXzqNMl6MCDp5e9THA&usqp=CAU'
    },
    createdInDataBase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
      timestamps: false
    });
  };

