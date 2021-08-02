const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('occupation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};



/* 
ID
Nombre
La relación entre ambas entidades debe ser de muchos a muchos ya que un personaje puede tener varias 
"ocupaciones" en simultaneo y, a su vez, una "ocupación" puede corresponder a múltiples personajes.
 Por ejemplo, Kimberly Wexler es 'lawyer', pero a su vez existen otros personajes con esa ocupación. */