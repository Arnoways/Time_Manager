'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workingtime = sequelize.define('Workingtime', {
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    employeeId: DataTypes.INTEGER
  }, {});
  Workingtime.associate = function(models) {
    // associations can be defined here
    Workingtime.belongsTo(models.Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
  };
  return Workingtime;
};