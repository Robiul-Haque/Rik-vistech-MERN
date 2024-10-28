const REFRESH_TOKEN_COOKIE_OPTIONS = {
  domain: "localhost",
  httpOnly: true,
};
const TOKEN_NAME = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
};
const userIgnoreFeilds = {
  password: 0,
};
const USER_POPULATED_FIELDS = "firstName lastName email phone whatsapp userId role status";
module.exports = {
  REFRESH_TOKEN_COOKIE_OPTIONS,
  TOKEN_NAME,
  userIgnoreFeilds,
  USER_POPULATED_FIELDS,
};
