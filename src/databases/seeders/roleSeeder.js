const mongoose = require("mongoose");
const Role = require("../../models/Role");
const Permission = require("../../models/Permission");
const dotenv = require("dotenv");

dotenv.config();

const RoleSeeder = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);

    const roles = [
      {
        name: "admin",
        permission_names: [
          "create-user",
          "edit-user",
          "delete-user",
          "view-users",
          "create-hostel",
          "edit-hostel",
          "delete-hostel",
          "view-hostels",
          "create-room",
          "edit-room",
          "delete-room",
          "view-rooms",
          "create-role",
          "edit-role",
          "delete-role",
          "view-roles",
          "assign-permissions",
          "remove-permissions",
          "view-permissions",
          "create-building",
          "edit-building",
          "delete-building",
          "view-buildings",
        ],
      },
      {
        name: "manager",
        permission_names: [
          "create-hostel",
          "edit-hostel",
          "view-hostels",
          "create-room",
          "edit-room",
          "view-rooms",
          "create-building",
          "edit-building",
          "view-buildings",
        ],
      },
    ];

    for (const role of roles) {
      const permissions = await Permission.find({
        name: { $in: role.permission_names },
      });
      console.log("Permissions =>>>", permissions);

      const permissionIds = permissions.map((permission) =>
        permission._id.toString()
      );

      const existingRole = await Role.findOne({ name: role.name });
      if (!existingRole) {
        const newRole = new Role({
          name: role.name,
          permission_ids: permissionIds,
        });
        await newRole.save();
        console.log(`Role '${role.name}' created successfully.`);
      } else {
        console.log(`Role '${role.name}' already exists, skipping...`);
      }
    }

    console.log("Roles seeded successfully");
  } catch (error) {
    console.error("Error seeding roles:", error);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = RoleSeeder;
