const dotenv = require("dotenv");

dotenv.config();

const UserSeeder = require("./userSeeder");
const PermissionSeeder = require("./permissionSeeder");
const RoleSeeder = require("./roleSeeder");

const runSeeders = async () => {
  try {
    await UserSeeder();
    await PermissionSeeder();
    await RoleSeeder();

    console.log("All seeders have run successfully.");
  } catch (error) {
    console.error("Error running seeders:", error);
  }
};

runSeeders();
