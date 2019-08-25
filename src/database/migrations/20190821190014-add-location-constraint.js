module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Location',
    'parentId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Location',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  ),

  down: queryInterface => queryInterface.removeColumn('Location', 'parentId')
};
