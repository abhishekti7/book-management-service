'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT
      },
      published_date: {
        type: Sequelize.DATEONLY
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Authors',
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
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

    // add index on the table on author_id
    await queryInterface.addIndex('Books', ['author_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};