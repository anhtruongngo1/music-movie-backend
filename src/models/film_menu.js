'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film_menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Film_menu.belongsTo(models.menu, { foreignKey: 'id' }),
      // Film_menu.belongsTo(models.film,{foreignKey:'categoryId'})
    }
  }
  Film_menu.init({
      movieId: DataTypes.STRING,
      menuId:DataTypes.STRING ,
      
    
    

    
    
    
  }, {
    sequelize,
    modelName: 'Film_menu',
  });
  return Film_menu;
};