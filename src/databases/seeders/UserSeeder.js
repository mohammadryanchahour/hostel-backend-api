const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const dotenv = require("dotenv");
const Role = require("../../models/Role");

console.log(dotenv);

dotenv.config();

const UserSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    const users = [
      {
        email: "owner@example.com",
        password: await bcrypt.hash("admin123", 10),
        user_type: "owner",
        is_verified: true,
        role_id: null,
      },
      {
        email: "staff@example.com",
        password: await bcrypt.hash("staff123", 10),
        user_type: "staff",
        is_verified: true,
        role_id: null,
      },
      {
        email: "boarder@example.com",
        password: await bcrypt.hash("boarder123", 10),
        user_type: "boarder",
        is_verified: true,
        role_id: null,
      },
    ];

    for (const userData of users) {
      if (userData.user_type === "owner") {
        const role = await Role.findOne({ name: "admin" });
        userData.role_id = role._id;
      } else if (userData.user_type === "staff") {
        const role = await Role.findOne({ name: "manager" });
        userData.role_id = role._id;
      } else if (userData.user_type === "boarder") {
        const role = await Role.findOne({ name: "boarder" });
        userData.role_id = role._id;
      } else {
        throw new Error("Role Not Found");
      }
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const newUser = new User(userData);
        await newUser.save();
        console.log(`User '${userData.email}' created successfully.`);
      } else {
        console.log(`User '${userData.email}' already exists, skipping...`);
      }
    }

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = UserSeeder;
