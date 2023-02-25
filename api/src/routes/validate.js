 const validate = (race) => {
    let error = {};
    let numberArray = [];
    let specialArray = [];
  
    let name = race.name;
  
    let number = /[0-9]/gi;
    let special = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/gi;
    numberArray = name.match(number);
    specialArray = name.match(special);
  
    if (race.name === "") error.name = "Name is required";
  
    if (numberArray?.length > 0) error.name = "Name cannot contain numbers";
  
    if (specialArray?.length > 0)
      error.name = "Name cannot contain special characters";
  
    if (race.heightMin === "") error.heightMin = "Height min is required";
  
    if (race.heightMin > race.heightMax)
      error.heightMin = "Height min must be less than height max";
  
    if (race.heightMax === "") race.heightMax = "Height max is required";
  
    if (race.weightMin === "") error.weightMin = "Weight min is required";
  
    if (race.weightMin > race.weightMax)
      error.weightMin = "Weight min must be less than weight max";
  
    if (race.weightMax === "") error.weightMax = "Weight max is required";
  
    if (race.lifeSpanMin === "") error.lifeSpanMin = "Life span min is required";
  
    if (race.lifeSpanMin > race.lifeSpanMax)
      error.lifeSpanMin = "Life span min must be less than life span max";
  
    if (race.lifeSpanMax === "") error.lifeSpanMax = "Life span max is required";
  
    return error;
  };
  
  module.exports = validate;