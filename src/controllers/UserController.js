const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
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

// module.exports = {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// };
