const Role = require("../../models/Role");

class RoleService {
  static async getRoleByName(name) {
    const role = await Role.findOne({ name: name });

    if (!role) {
      throw new RoleNotFoundError();
    }

    return role;
  }

  static async getRoleById(id) {
    const role = await Role.findById(id);

    if (!role) {
      throw new RoleNotFoundError();
    }

    return role;
  }

  // static async roleHasPermission(role_id, permission) {
  //   const role = getRoleById(role_id);
  // }
}

module.exports = RoleService;
