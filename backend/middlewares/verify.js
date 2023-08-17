const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, resp, next) => {
  const token = req.header("Authorization");
  console.log(token);
  console.log("inside the verify token", req.body);

  try {
    if (!token) {
      throw new Error();
    }
    const { userId } = await jwt.verify(token, process.env.JWT_KEY);

    if (userId) {
      req.userId = userId;
      next();
    }
  } catch (error) {
    resp.status(404).json({ message: "you are not logged in" });
  }
};
