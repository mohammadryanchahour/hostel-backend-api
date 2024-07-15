const { SuccessResponse, ErrorResponse } = require("../helpers/ResponseHelper");
const { responseMessages } = require("../helpers/StaticHelper");
const PermissionService = require("../services/Access/PermissionService");
const RoleService = require("../services/Access/RoleService");

// Create a new role
const createRole = async (req, res) => {
  try {
    const response = await RoleService.createRole(req.body);
    return SuccessResponse(
      res,
      201,
      responseMessages.ROLE_CREATE_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const response = await RoleService.getAll();
    return SuccessResponse(
      res,
      200,
      responseMessages.ROLE_RETRIEVAL_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

// Get a role by ID
const retrieveRole = async (req, res) => {
  try {
    const role = req.params.role;

    let response;

    if (ObjectId.isValid(role)) {
      response = await RoleService.getRoleById(role);
    } else {
      response = await RoleService.getRoleByName(role);
    }
    return SuccessResponse(
      res,
      200,
      responseMessages.ROLE_RETRIEVAL_SUCCESS,
      response
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

// Update a role
const updateRole = async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, permissions },
      { new: true }
    );
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a role
const removeRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ error: "Role not found" });
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPermissionsOfRole = async (req, res) => {
  try {
    const role = req.params.role;

    const permissions = await PermissionService.getPermissionsForRole(role);

    return SuccessResponse(
      res,
      200,
      responseMessages.PERMISSION_RETRIEVAL_SUCCESS,
      permissions
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const permissions = await PermissionService.getAllPermissions();
    return SuccessResponse(
      res,
      200,
      responseMessages.PERMISSION_RETRIEVAL_SUCCESS,
      permissions
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return ErrorResponse(res, error.statusCode, error.message);
    } else {
      return ErrorResponse(res, 500, responseMessages.INTERNAL_SERVER_ERROR);
    }
  }
};

module.exports = {
  createRole,
  getAllRoles,
  retrieveRole,
  updateRole,
  removeRole,
  getPermissionsOfRole,
  getAllPermissions,
};
