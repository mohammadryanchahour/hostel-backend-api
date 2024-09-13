const dotenv = require("dotenv");

dotenv.config();

const UserSeeder = require("./UserSeeder");
const PermissionSeeder = require("./PermissionSeeder");
const RoleSeeder = require("./RoleSeeder");

const runSeeders = async () => {
  try {
    await PermissionSeeder();
    await RoleSeeder();
    await UserSeeder();

    console.log("All seeders have run successfully.");
  } catch (error) {
    console.error("Error running seeders:", error);
  }
};

runSeeders();
