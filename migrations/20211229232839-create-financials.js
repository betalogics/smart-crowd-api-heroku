'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('financials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      gross_rent_per_year: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      gross_rent_per_month :{
        type: Sequelize.DOUBLE
      },
      property_management_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      platform_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      maintenance_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      property_tax_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      insurance_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      utility_charges :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      net_rent_per_month :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      net_net_per_year :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      asset_price_investment :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      platform_listing_fee_investment :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      initial_maintenance_reserve_investment :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      miscellaneous_costs_investment :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      expected_income_percentage :{
        allowNull: false,
        type: Sequelize.DOUBLE
      },


      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('financials');
  }
};