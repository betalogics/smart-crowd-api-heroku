'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'kyc_front_image',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Users',
        'kyc_back_image',
        {
          type: Sequelize.STRING,
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.dropColumn('Users', 'kyc_front_image'),
      queryInterface.dropColumn('Users', 'kyc_back_image'),
    ])
  }
};
