
const User = require("../modules/user/user.model");

const referChecker = async (user) => {
    const total = await User.countDocuments({ reference: user });

    // if total is less than 30 then return true
    if (total < 30) {
        return true
    }
    // get all the referance of the user  and divide on 30 30 slice and check in last slice if any one is active or not

    // const refers = await Refer.find({ referer: user })
    //     .sort({ createdAt: -1 })
    //     .populate("user")
    //     .exec();
    const refers = await User.find({ reference: user });
    console.log(refers.length)
    function divideArray(array, chunkSize) {
        const dividedArrays = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            dividedArrays.push(array.slice(i, i + chunkSize));
        }
        return dividedArrays;
    }

    const dividedArrays = divideArray(refers, 30); // Divide array into chunks of size 3
    const isActivate = dividedArrays[dividedArrays.length - 2].some(ref => ref.status === "active")

    // const isActivate = refers.some(ref => ref.user.status === "active")

    if (!isActivate) {
        return false
    }
    else {
        return true
    }
}

module.exports = { referChecker }