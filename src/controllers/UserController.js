const { ErrorResponse, SuccessResponse } = require("../helpers/ResponseHelper");
const UserService = require("../services/User/UserService");
const {
  UserAlreadyExistsError,
  PasswordMismatchError,
  // UserNotFoundError,
  // InvalidPasswordError,
  // InvalidTokenError,
  // InvalidOTPError,
  // EmailVerificationRequiredError,
  // EmailVerificationFailedError,
} = require("../Exception/ExceptionService");

const createUser = async (req, res) => {
  try {
    const { email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      throw new PasswordMismatchError();
    }
    const existingUser = await UserService.getUserByEmail(email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
    const user = await UserService.createUser({ email, password });
    let keys = ["email", "user_type"];

    const response = {
      user: user,
    };
    response.user = _.pick(response.user, keys);

    return SuccessResponse(
      res,
      201,
      responseMessages.REGISTRATION_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving users", error });
//   }
// };

// const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving user", error });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const user = await User.findById(req.params.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.name = name || user.name;
//     user.email = email || user.email;
//     user.password = password ? await bcrypt.hash(password, 10) : user.password;
//     user.role = role || user.role;

//     const updatedUser = await user.save();
//     res
//       .status(200)
//       .json({ message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating user", error });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting user", error });
//   }
// };

module.exports = {
  createUser,
  // getUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
};
