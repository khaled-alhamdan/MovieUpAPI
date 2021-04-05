module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
  });
  return Review;
};
