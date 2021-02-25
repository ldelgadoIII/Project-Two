module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("List", {
    title: {
      type: DataTypes.STRING,
      // eslint-disable-next-line prettier/prettier
      allowNull: false,
      // eslint-disable-next-line prettier/prettier
    },
  });
  return List;
};
