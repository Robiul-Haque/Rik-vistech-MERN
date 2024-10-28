const Setting = require("../modules/user/setting.model");

const getSetting = async () => {
    const setting = await Setting.findById("65f545aec4314a97fa9b4343");
    return setting
}

module.exports = { getSetting }