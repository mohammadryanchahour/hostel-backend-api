const Role = require("../../models/Role");
const {
  RoleNotFoundError,
  FailedToCreateRoleError,
  FailedToRetrieveRoleError,
} = require("../Exception/ExceptionService");
const PermissionService = require("./PermissionService");

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

  static async getAllRoles() {
    try {
      const roles = Role.find();
      return roles;
    } catch (error) {
      throw new FailedToRetrieveRoleError();
    }
  }

  static async createRole(payload) {
    try {
      const permissions = PermissionService.validatePermissionIds(
        payload.permission_ids
      );

      if (permissions) {
        const role = new Role({
          name: payload.name,
          permission_ids: payload.permission_ids,
        });
        await role.save();
        return role;
      }
    } catch (error) {
      throw new FailedToCreateRoleError();
    }
  }
}

module.exports = RoleService;
