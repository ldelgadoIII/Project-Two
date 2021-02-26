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
    },
  });

  // eslint-disable-next-line prettier/prettier
  Task.associate = (models) => {
    models.Task.belongsToMany(models.User, {
      through: "Completes",
      as: "Task",
      foreignKey: "Task_Id"
    });
    models.Task.belongsTo(models.List);
  };
  return Task;
};
