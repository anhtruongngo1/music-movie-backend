'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' }),
        Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' }),
        Allcode.hasMany(models.Film, { foreignKey: 'categoryId', as: 'categoryData' }),
        Allcode.hasMany(models.Film, { foreignKey: 'Year', as: 'yearData' })
        
    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING ,
    type: DataTypes.STRING ,
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};