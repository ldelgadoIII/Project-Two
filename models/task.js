module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define("Task", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // eslint-disable-next-line prettier/prettier
        len: [1],
        // eslint-disable-next-line prettier/prettier
      },
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      // eslint-disable-next-line prettier/prettier
      allowNull: false,
      // eslint-disable-next-line prettier/prettier
    },
  });

  // eslint-disable-next-line prettier/prettier
  Task.associate = (models) => {
    models.Task.belongsToMany(models.User, {
      through: "Completes",
      as: "Task",
      // eslint-disable-next-line prettier/prettier
      foreignKey: "Task_Id",
    });
  };
  return Task;
};
