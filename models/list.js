module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("List", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  List.associate = models => {
    models.List.belongsTo(models.User);
    models.List.belongsToMany(models.User, {
      through: "StudentsLists",
      as: "List",
      foreignKey: "List_Id"
    });
  };

  return List;
};
