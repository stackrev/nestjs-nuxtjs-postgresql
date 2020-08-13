const bcrypt = require("bcrypt");
const moment = require("moment");

let password = "";
bcrypt.hash("secret", 10, function(err, hash) {
  password = hash;
});

module.exports = [
  {
    id: "c5c5a4bb-bb32-4268-9563-0be9750229fe",
    mobile: "09365895522",
    username: "mostafa",
    email: "mostafagholamidev@gmail.com",
    name: "مصطفی",
    family: "غلامی",
    password: password,
    status: 1,
    email_verified_at: moment().format("LLLL"),
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  },
  {
    id: "2ee6cf4b-8ba6-40cf-84f3-d4b8e70f70d9",
    mobile: "09136890835",
    username: "mehdi",
    email: "mehditaherian@gmail.com",
    name: "مهدی",
    family: "طاهریان",
    password: password,
    status: 1,
    email_verified_at: moment().format("LLLL"),
    created_at: moment().format("LLLL"),
    updated_at: moment().format("LLLL")
  }
];
