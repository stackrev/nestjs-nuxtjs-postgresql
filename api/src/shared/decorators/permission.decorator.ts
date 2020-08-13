import { createParamDecorator, ForbiddenException } from "@nestjs/common";
import { getManager } from "typeorm";

export const Permission = createParamDecorator(
  async (permission: string, req) => {
    let result = await getManager().query(`
                    SELECT * FROM users
                    JOIN role_user ON users.id = role_user.user_id
                    JOIN roles ON role_user.role_id = roles.id
                    JOIN permission_role ON permission_role.role_id = roles.id
                    JOIN permissions ON permission_role.permission_id = permissions.id
                    WHERE users.id='${req.user.id}' AND permissions.name = '${permission}';
                `);

    let flag = result[0] == undefined;

    if (flag) throw new ForbiddenException();
    return !flag;
  }
);
