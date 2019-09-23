'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamContent = sequelize.define('TeamContent', {
    teamId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER
  }, {});
  TeamContent.associate = function(models) {
    // associations can be defined here
    TeamContent.belongsTo(models.Team, {foreignKey: 'teamId', onDelete: 'CASCADE' });
    TeamContent.belongsTo(models.Employee, {foreignKey: 'employeeId', onDelete: 'CASCADE' });
  };
  return TeamContent;
};
