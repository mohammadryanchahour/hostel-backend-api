const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const dotenv = require("dotenv");

console.log(dotenv);

dotenv.config();

const UserSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    const users = [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        is_verified: true,
      },
      {
        email: "manager@example.com",
        password: await bcrypt.hash("manager123", 10),
        role: "manager",
        is_verified: true,
      },
    ];

    for (const userData of users) {
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
