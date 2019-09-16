'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    managerId: DataTypes.INTEGER
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
    Team.belongsTo(models.Employee, {foreignKey: 'managerId'});
  };
  return Team;
};