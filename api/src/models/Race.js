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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0.50,
        get() {
          let heightGet = this.getDataValue('height');
          return heightGet + ' inches at the shoulder'
        }
      },
      weight: {
        type: DataTypes.STRING,
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
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQwjG444l7xRM8P4pRxMSu09QBj7D_xrSPXg&usqp=CAU'
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

  // require('dotenv').config();
  // const axios = require('axios')
  // const { Router} = require('express');
  // const  {APIKEY } = process.env
  // const {Temperamentos} = require('../db.js')
  
  // exports.verTemperamentos =  (req,res)=>{
  //     try {
  //         axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
  //         .then(async response =>{
  //             let arrayTemp = response.data.map(dog => {
  //                 return dog.temperament
  //             }).toString().split(', ').toString().split(',')
  
  //             let arraySplit = []
  //             arrayTemp.map( async element => {
  //                 if(arraySplit.length === 0){
  //                     arraySplit.push(element)
  //                 }else if(!arraySplit.includes(element) && element !== ""){
  //                     arraySplit.push(element)
  //                 }
                  
  //             })
  //             arraySplit.map(async (element) => {
  //                 await Temperamentos.findOrCreate({
  //                     where:{
  //                         Nombre: element 
  //                     }
  //                 })
  //             })
  
  //             let temperamentsDB = await Temperamentos.findAll()
  
  //             res.status(200).json(temperamentsDB)
  //         })
          
  //     } catch (error) {
  //         res.status(400).json({status:400, message: error.message})
  //     }
      
  // }