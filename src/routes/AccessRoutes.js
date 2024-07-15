const express = require("express");
const router = express.Router();
const {
  createRole,
  getAllRoles,
  retrieveRole,
  updateRole,
  removeRole,
  getPermissionsOfRole,
  getAllPermissions,
} = require("../controllers/RoleController");
const IsAuthenticated = require("../middlewares/AuthMiddleware");
const HasPermission = require("../middlewares/PermissionMiddleware");

// Create a new role
router.post(
  "/create-role",
  IsAuthenticated,
  HasPermission("create-role"),
  createRole
);

// Get all roles
router.get(
  "/get-roles",
  IsAuthenticated,
  HasPermission("view-role"),
  getAllRoles
);

// Retrieve a specific role by ID
router.get(
  "/get-role/:role",
  IsAuthenticated,
  HasPermission("view-role"),
  retrieveRole
);

// Update a role by ID
router.put(
  "/edit-role/:roleId",
  IsAuthenticated,
  HasPermission("edit-role"),
  updateRole
);

// Remove a role by ID
router.delete(
  "/delete-role/:roleId",
  IsAuthenticated,
  HasPermission("edit-role"),
  removeRole
);

// Get permissions for a specific role
router.get(
  "/get-permissions-for-role/:role/permissions",
  IsAuthenticated,
  HasPermission("view-permission"),
  getPermissionsOfRole
);

// Get all permissions
router.get(
  "/get-permissions",
  IsAuthenticated,
  HasPermission("view-permission"),
  getAllPermissions
);

module.exports = router;
