const { ErrorResponse } = require("../helpers/ResponseHelper");
const { responseMessages } = require("../helpers/StaticHelper");
const PermissionService = require("../services/Access/PermissionService");
const RoleService = require("../services/Access/RoleService");

const HasPermission = (requiredPermission) => (req, res, next) => {
  try {
    const role = RoleService.getRoleById(req.user.role_id);
    if (!role) {
      throw new RoleNotFoundError();
    }
    const permission =
      PermissionService.getPermissionByName(requiredPermission);
    if (!permission) {
      throw new PermissionNotFoundError();
    }

    const hasPermission = role.permission_ids.includes(
      permission.id.toString()
    );

    if (hasPermission) {
      next();
    } else {
      return ErrorResponse(res, 401, responseMessages.PERMISSION_REQUIRED);
    }
  } catch (error) {
    return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
  }
};

module.exports = HasPermission;
