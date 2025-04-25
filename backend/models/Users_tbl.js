module.exports = (sequelize, DataTypes) => {
  const Users_tbl = sequelize.define("Users_tbl", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users_tbl.associate = (models) => {
    Users_tbl.hasMany(models.Tasks_tbl, {
      foreignKey: "Task_by",
      as: "Task",
      onDelete: "cascade",
    });
  };

  return Users_tbl;
};
