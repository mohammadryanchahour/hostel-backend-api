const Permission = require("../../models/Permission");
const {
  PermissionNotFoundError,
  InvalidPermissionsError,
} = require("../Exception/ExceptionService");

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
}

module.exports = PermissionService;
