const mongoose = require("mongoose");
const Permission = require("../../models/Permission");
const dotenv = require("dotenv");

dotenv.config();

const PermissionSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    const permissions = [
      // Role and Permission Management
      { name: "create-role", slug: "Create a Role" },
      { name: "edit-role", slug: "Edit a Role" },
      { name: "view-role", slug: "View Roles List" },
      { name: "edit-permission", slug: "Edit Permission from Role" },
      { name: "view-permission", slug: "View Permissions List" },

      // User Management
      { name: "create-user", slug: "Create a User" },
      { name: "edit-user", slug: "Edit a User" },
      { name: "view-user", slug: "View Users List" },

      // Hostel Management
      { name: "create-hostel", slug: "Create a Hostel" },
      { name: "edit-hostel", slug: "Edit a Hostel" },
      { name: "view-hostel", slug: "View Hostels List" },

      // Building Management
      { name: "create-building", slug: "Create a Building" },
      { name: "edit-building", slug: "Edit a Building" },
      { name: "view-building", slug: "View Buildings List" },

      // Room Management
      { name: "create-room", slug: "Create a Room" },
      { name: "edit-room", slug: "Edit a Room" },
      { name: "view-room", slug: "View Rooms List" },
    ];

    for (const permission of permissions) {
      const existingPermission = await Permission.findOne({
        name: permission.name,
      });
      if (!existingPermission) {
        await Permission.create(permission);
        console.log(`Permission '${permission.name}' created successfully.`);
      } else {
        console.log(
          `Permission '${permission.name}' already exists, skipping...`
        );
      }
    }

    console.log("Permissions seeded successfully");
  } catch (error) {
    console.error("Error seeding permissions:", error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = PermissionSeeder;
