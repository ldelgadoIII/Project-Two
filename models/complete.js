module.exports = function(sequelize, DataTypes) {
  const Completes = sequelize.define("Completes", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Completes;
};
