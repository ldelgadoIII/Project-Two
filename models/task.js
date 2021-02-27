module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  Task.associate = models => {
    models.Task.belongsToMany(models.User, {
      through: {
        model: "Completes",
        as: "Users",
        unique: false
      },
      constraints: false,
      foreignKey: "Task_Id"
    });
    models.Task.belongsTo(models.List);
  };
  return Task;
};
