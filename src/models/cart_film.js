'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cartfilm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cartfilm.hasOne(models.Film, { foreignKey: 'id' })

     }
   }
  Cartfilm.init({
    idUser: DataTypes.STRING,
 
    
  }, {
    sequelize,
    modelName: 'Cartfilm',
  });
  return Cartfilm;
};