module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define("Friend", {
    status: {
      type: DataTypes.STRING,
    },
  });
  return Friend;
};
