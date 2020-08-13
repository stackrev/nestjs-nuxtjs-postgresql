const moment = require("moment");

module.exports = [
  {
    id: "e2f0bef4-4c06-4b2c-96b0-e3f8d4ddcc3a",
    name: "admin",
    title: "ادمین کل",
    description: "تمامی مجوز های سیستم را دارا می باشد",
    priority: 1,
    delete_able: 0,
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: "d38d9b2d-f118-479f-a26d-ba8f5771ff08",
    name: "operator",
    title: "اپراتور",
    description: "بخشی از مجوز های سیستم را دارا می باشد",
    priority: 2,
    delete_able: 0,
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: "02bbd1e1-2633-45a7-932a-730c30b37059",
    name: "employer",
    title: "کارفرما",
    description: "مجوز های مربوط به اشخاص کارفرما را دارا می باشد",
    priority: 3,
    delete_able: 0,
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: "2a9c8856-2213-4b4b-9e2a-7212f41ef369",
    name: "placement",
    title: "کاریاب",
    description: "مجوز های مربوط به اشخاص کاریاب را دارا می باشد",
    priority: 4,
    delete_able: 0,
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: "efe2716f-d300-447e-9b5b-40d2d99f3a0e",
    name: "job_seeker",
    title: "کارجو",
    description: "مجوز های مربوط به کارجو ها را دارا می باشد",
    priority: 5,
    delete_able: 0,
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  }
];
