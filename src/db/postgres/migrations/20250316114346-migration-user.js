"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.addColumn("Users", "userType", {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2,
        });
    },

    async down(queryInterface, Sequelize) {
        queryInterface.removeColumn("Users", "userType");
    },
};
