const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         allowNull: false,
         primaryKey: true
    
   },
     nickname:{
        type: DataTypes.STRING,
        allowNull: false
   },
    birthdate:{
        type: DataTypes.STRING,
        allowNull:false
    },
    status: {
        type: DataTypes.ENUM("Presumed dead", "Alive", "Deceased", "Unknown"),
        allowNull:true
   },
   image: {
       type: DataTypes.TEXT,
        allowNull: true
   },
   createdindb: {
      type: DataTypes.BOOLEAN,
      allowNull:false, 
      //default value:true
   }
  });
};


/* El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

[ ] Personaje con las siguientes propiedades:
ID *
Nombre *
Nickname *
  *
Status
Imagen */