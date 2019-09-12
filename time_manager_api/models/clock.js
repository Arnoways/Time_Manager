'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clock = sequelize.define('Clock', {
    time: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    employeeId: DataTypes.INTEGER
  }, {});
  Clock.associate = function(models) {
    // associations can be defined here
    Clock.belongsTo(models.Employee, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
  };
  return Clock;
};