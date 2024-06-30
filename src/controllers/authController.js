const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SuccessResponse, ErrorResponse } = require("../helpers/responseHelper");

const register = async (req, res) => {
  const { email, password, confirm_password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "User already exists")
      );
    }

    if (password !== confirm_password) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "Passwords do not match")
      );
    }

    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedData = await user.save();

    const responseData = {
      token: jwt.sign({ id: savedData.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      user: savedData,
    };

    return SuccessResponse(
      res,
      (statusCode = 201),
      (message = "User Registered Successfully!"),
      (data = responseData)
    );
  } catch (error) {
    console.error("Error while registering a user:", error);
    return ErrorResponse(
      res,
      (statusCode = 500),
      (message =
        "This is an Internal Server Error. We are working on resolving this issue, please try again later.")
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "User Not Found")
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ErrorResponse(
        res,
        (statusCode = 400),
        (message = "Invalid Email or Password.")
      );
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const refresh = async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const payload = {
      user: {
        id: decoded.user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, newToken) => {
        if (err) throw err;
        res.json({ newToken });
      }
    );
  } catch (error) {
    console.error("Error in token refresh:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  refresh,
};
