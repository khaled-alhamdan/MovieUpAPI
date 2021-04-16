module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "This movie already exists",
      },
    },
    ageRestriction: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
  });
  return Movie;
};
