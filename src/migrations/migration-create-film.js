'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Films', {
        // key: DataTypes.STRING,
        // type : DataTypes.STRING,
        // value_en: DataTypes.STRING,
        // value_vi: DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT
      },
      movieName: {
        type: Sequelize.BLOB('long')
      },
      trailerMovie: {
        type: Sequelize.TEXT
      },
      linkMovie: {
        type: Sequelize.TEXT
      },
      
      time: {
        type: Sequelize.TEXT
      },
      actor: {
        type: Sequelize.TEXT
      },
      director: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
        },
        categoryId: {
            type: Sequelize.STRING
        },
        Year: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.BLOB('long')
      },
      backgroundImg: {
        type: Sequelize.BLOB('long')
    },
        quality: {
            type: Sequelize.TEXT
          },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Films');
  }
};