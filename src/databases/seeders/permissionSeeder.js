// src/db/seeds/seedPermissions.js

const Permission = require("../../models/Permission");

const seedPermissions = async () => {
  try {
    const permissions = [
      // Role and Permission Management
      { name: "create-role", slug: "Create a Role" },
      { name: "edit-role", slug: "Edit a Role" },
      { name: "delete-role", slug: "Delete a Role" },
      { name: "view-roles", slug: "View Roles List" },
      { name: "assign-permissions", slug: "Assign Permissions to Role" },
      { name: "remove-permissions", slug: "Remove Permissions from Role" },
      { name: "view-permissions", slug: "View Permissions List" },

      // User Management
      { name: "create-user", slug: "Create a User" },
      { name: "edit-user", slug: "Edit a User" },
      { name: "delete-user", slug: "Delete a User" },
      { name: "view-users", slug: "View Users List" },

      // Hostel Management
      { name: "create-hostel", slug: "Create a Hostel" },
      { name: "edit-hostel", slug: "Edit a Hostel" },
      { name: "delete-hostel", slug: "Delete a Hostel" },
      { name: "view-hostels", slug: "View Hostels List" },

      // Building Management
      { name: "create-building", slug: "Create a Building" },
      { name: "edit-building", slug: "Edit a Building" },
      { name: "delete-building", slug: "Delete a Building" },
      { name: "view-buildings", slug: "View Buildings List" },

      // Room Management
      { name: "create-room", slug: "Create a Room" },
      { name: "edit-room", slug: "Edit a Room" },
      { name: "delete-room", slug: "Delete a Room" },
      { name: "view-rooms", slug: "View Rooms List" },
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
  }
};

module.exports = seedPermissions;
