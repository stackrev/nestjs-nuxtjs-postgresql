const uuid = require("uuid/v4");
const moment = require("moment");

module.exports = [
  {
    id: uuid(),
    name: "role_list",
    title: "لیست نقش ها",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: uuid(),
    name: "role_show",
    title: "نمایش نقش",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: uuid(),
    name: "role_store",
    title: "ثبت نقش",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: uuid(),
    name: "role_update",
    title: "ویرایش نقش",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: uuid(),
    name: "role_delete",
    title: "حذف نقش",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: uuid(),
    name: "role_permission_sync",
    title: "مجوزهای نقش",
    module: "roles",
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  }
];
