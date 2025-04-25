module.exports = (sequelize, DataType) => {
  const Tasks_tbl = sequelize.define("Tasks_tbl", {
    ID: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Task_by: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    Description: {
      type: DataType.TEXT("long"),
      allowNull: false,
    },
    Status: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
  });

  Tasks_tbl.associate = (models) => {
    Tasks_tbl.belongsTo(models.Users_tbl, {
      foreignKey: "Task_by",
      as: "User_ID",
      onDelete: "cascade",
    });
  };

  return Tasks_tbl;
};
