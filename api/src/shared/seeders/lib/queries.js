const moment = require("moment");
const users = require("../data/users");
const roles = require("../data/roles");
const roleUsers = require("../data/roleUsers");
const permissions = require("../data/permissions");

module.exports = {
  // #################### #################### #################### #################### #################### //
  users: () => {
    let query = `insert into users 
      (id, mobile, username, email, name, family, password, status, email_verified_at, created_at, updated_at)
      values `;
    users.forEach(user => {
      query += `(
              '${user.id}',
              '${user.mobile}',
              '${user.username}',
              '${user.email}',
              '${user.name}',
              '${user.family}',
              '${user.password}',
              '${user.status}',
              '${user.email_verified_at}',
              '${user.created_at}',
              '${user.updated_at}'
              ),`;
    });
    query = (query.slice(0, -1) + ";")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n/g, "");

    console.log(`[${moment().format("hh:mm:ss:SSS")}] Users query generated.`);
    return query;
  },
  // #################### #################### #################### #################### #################### //
  roles: () => {
    let query = `INSERT INTO roles (id, name, title, description, priority, delete_able, created_at, updated_at) VALUES `;
    roles.forEach(role => {
      query += `(
              '${role.id}',
              '${role.name}',
              '${role.title}',
              '${role.description}',
              '${role.priority}',
              '${role.delete_able}',
              '${role.created_at}',
              '${role.updated_at}'
              ),`;
    });
    query = (query.slice(0, -1) + ";")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n/g, "");

    console.log(`[${moment().format("hh:mm:ss:SSS")}] Roles query generated.`);
    return query;
  },
  // #################### #################### #################### #################### #################### //
  roleUser: () => {
    let query = `INSERT INTO role_user (role_id, user_id) VALUES `;
    roleUsers.forEach(item => {
      query += `(
              '${item.role_id}',
              '${item.user_id}'
              ),`;
    });
    query = (query.slice(0, -1) + ";")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n/g, "");

    console.log(
      `[${moment().format("hh:mm:ss:SSS")}] RoleUser query generated.`
    );
    return query;
  },
  // #################### #################### #################### #################### #################### //
  permissions: () => {
    let query = `INSERT INTO permissions (id, name, title, module, created_at, updated_at) VALUES `;
    permissions.forEach(permission => {
      query += `(
              '${permission.id}',
              '${permission.name}',
              '${permission.title}',
              '${permission.module}',
              '${permission.created_at}',
              '${permission.updated_at}'
              ),`;
    });
    query = (query.slice(0, -1) + ";")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n/g, "");

    console.log(
      `[${moment().format("hh:mm:ss:SSS")}] Permissions query generated.`
    );
    return query;
  },
  // #################### #################### #################### #################### #################### //
  permissionRole: ids => {
    let query = `INSERT INTO permission_role (role_id, permission_id) VALUES `;
    ids.forEach(item => {
      query += `(
              'e2f0bef4-4c06-4b2c-96b0-e3f8d4ddcc3a',
              '${item.id}'
              ),`;
    });
    query = (query.slice(0, -1) + ";")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n/g, "");

    console.log(
      `[${moment().format("hh:mm:ss:SSS")}] PermissionRole query generated.`
    );
    return query;
  }
};
