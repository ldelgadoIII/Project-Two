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
      through: {
        model: "StudentsLists",
        as: "Students",
        unique: false
      },
      constraints: false,
      foreignKey: "List_Id"
    });
    models.List.hasMany(models.Task, {
      onDelete: "CASCADE"
    });
  };

  return List;
};
