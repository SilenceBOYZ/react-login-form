'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VerifyTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token_string: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      exp_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(new Date().getTime() + 3 * 60 * 60 * 1000),
        // Set the exp for token (3 hour)
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('VerifyTokens', {
      fields: ['user_id'],
      type: "foreign key",
      name: "user_verify-token_association",
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VerifyTokens');
  }
};