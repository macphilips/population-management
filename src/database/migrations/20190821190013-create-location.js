
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Location', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    malePopulation: {
      type: Sequelize.INTEGER
    },
    femalePopulation: {
      type: Sequelize.INTEGER
    }
  }),
  down: queryInterface => queryInterface.dropTable('Location')
};
