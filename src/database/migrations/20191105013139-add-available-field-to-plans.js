module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('planos', 'available', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('planos', 'available');
  },
};
