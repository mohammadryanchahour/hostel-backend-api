const Permission = require("../../models/Permission");
const { PermissionNotFoundError } = require("../Exception/ExceptionService");

class PermissionService {
  static async getPermissionByName(name) {
    const permission = await Permission.findOne({ name: name });

    if (!permission) {
      throw new PermissionNotFoundError();
    }

    return permission;
  }
}

module.exports = PermissionService;
