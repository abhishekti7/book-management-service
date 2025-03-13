'use strict';

const bcrypt = require('bcryptjs');


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  // init functions is used to add the fields that the table contains
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // email has to be unique for every user
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // this hook runs everytime before a new user is being added to the database
      beforeCreate: async (user) => {
        if (user.password) {
          // generate a salt for the encryption
          const salt = await bcrypt.genSalt(10);

          // use the salt generated to hash the password
          user.password = await bcrypt.hash(user.password, salt);
        }
      },

      // this hook runs everytime before a user is updated in the database
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  /**
   * function validates the password
   * @param {*} password 
   * @returns boolean
   */
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  }

  /**
   * function finds a user by email and if exists, validates the password
   * @param {*} email 
   * @param {*} password 
   * @returns user
   */
  User.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email: email });

    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    return user;
  }

  return User;
};