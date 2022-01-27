class BaseModel {
  constructor() {
    this.id = {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    };
  }
  options(tableName, modelName) {
    return {
      sequelize: sequelize,
      tableName: tableName,
      modelName: modelName,
      underscored: true,
    };
  }
};

module.exports = BaseModel;
