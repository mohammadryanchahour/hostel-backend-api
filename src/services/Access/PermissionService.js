const Permission = require("../../models/Permission");
const {
  PermissionNotFoundError,
  InvalidPermissionsError,
  RoleNotFoundError,
} = require("../Exception/ExceptionService");
const RoleService = require("./RoleService");

class PermissionService {
  static async getPermissionByName(name) {
    const permission = await Permission.findOne({ name: name });

    if (!permission) {
      throw new PermissionNotFoundError();
    }

    return permission;
  }

  static async validatePermissionIds(permissionIds) {
    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (permissions.length !== permissionIds.length) {
      throw new InvalidPermissionsError();
    }
  }

  static async getPermissionsForRole(role) {
    let retrieved_role;
    if (ObjectId.isValid(role)) {
      retrieved_role = await RoleService.getRoleById(role);
    } else {
      retrieved_role = await RoleService.getRoleByName(role);
    }

    if (!role) {
      throw new RoleNotFoundError();
    }

    const permissionIds = role.permission_ids;

    await this.validatePermissionIds(permissionIds);
    const permissions = await Permission.find({ _id: { $in: permissionIds } });

    return permissions;
  }

  static async getAllPermissions() {
    try {
      const permissions = Permission.find();
      return permissions;
    } catch (error) {
      throw new FailedToRetrievePermissionError();
    }
  }
}

module.exports = PermissionService;
