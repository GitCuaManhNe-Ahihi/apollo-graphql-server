const jsonwebtoken = require("jsonwebtoken");
const createToken = async (user, type) => {
  if (!user) {
    throw new Error("User not found");
  }
  if (type === "refresh") {
    return await jsonwebtoken.sign(
      {...user},
      process.env.JWT_SECRET,
      { expiresIn: "7d"}
    );
  }
  return await jsonwebtoken.sign({...user}, process.env.JWT_SECRET, {
    expiresIn: "30m"
  });
};

module.exports = {
  createToken
};
