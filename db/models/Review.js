module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
  });
  return Review;
};
