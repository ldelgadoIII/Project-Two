module.exports = function(sequelize, DataTypes) {
  const StudentsLists = sequelize.define("StudentsLists", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return StudentsLists;
};
