const mongoose = require("mongoose")
const Refer = require("./refer.model")

const createRefer = async (user, refer) => {
    // check is this user, refer is Object id ?
    if (!mongoose.Types.ObjectId.isValid(refer) || !mongoose.Types.ObjectId.isValid(user)) {
        throw new Error("invalid refer")
    }

    const newRefer = new Refer({
        user: user,
        referer: refer
    })
    return await newRefer.save()
}
module.exports = { createRefer }