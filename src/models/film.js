'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Film.belongsTo(models.Allcode, { foreignKey: 'categoryId', targetKey: 'keyMap', as: 'categoryData' }),
      Film.belongsTo(models.Allcode, { foreignKey: 'Year', targetKey: 'keyMap', as: 'yearData' })
      Film.belongsTo(models.Cartfilm, { foreignKey: 'id',  })

     }
   }
  Film.init({
    name: DataTypes.TEXT,
    movieName: DataTypes.BLOB('long'),
    trailerMovie: DataTypes.TEXT,
    linkMovie: DataTypes.TEXT,
    time: DataTypes.TEXT,
    actor: DataTypes.TEXT,
    director: DataTypes.TEXT ,
    description: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    Year: DataTypes.STRING,
    image: DataTypes.STRING,
    backgroundImg: DataTypes.STRING,
    quality: DataTypes.STRING
    
    

    
    
    
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};