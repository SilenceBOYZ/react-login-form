'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VerifyToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VerifyToken.init({
    token_string: DataTypes.STRING,
    exp_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VerifyToken',
  });
  return VerifyToken;
};