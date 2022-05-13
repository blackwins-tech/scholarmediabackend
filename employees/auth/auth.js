const jwt = require("jsonwebtoken");
const checkToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    console.log("my token" + token);
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.status(404).send("access denied");
        return;
      } else {
        // const emp_name = req.headers["emp_name"];
        req.emp_name = decoded.emp_name;
        console.log("decoded emp name" + req.emp_name);
        next();
      }
    });
  } else {
    res.status(404).send("access denied");
    return;
  }
};

module.exports = { checkToken };
