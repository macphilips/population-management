module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('Location', {
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
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Comment.associate = () => {
    Comment.belongsTo(Comment, {
      // foreignKey: 'parentId',
      // targetKey: 'id',
      as: 'parent',
    });
    Comment.hasMany(Comment, { as: 'subLocation', foreignKey: 'parentId' });
  };
  return Comment;
};
