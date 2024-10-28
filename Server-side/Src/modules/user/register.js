const { referChecker } = require("../../helper/referCheck");
const { getSetting } = require("../../helper/setting");
const User = require("./user.model");
const bcrypt = require("bcrypt");

const referHandler = async (user, refer) => {
    if (refer && user) {
        const settings = await getSetting();
        const isActivate = await referChecker(refer.userId);
        if (isActivate) {
            await User.findByIdAndUpdate(refer._id, {
                $inc: {
                    balance: settings.refer_bonus,
                },
            });
            await assignCradit({
                amount: settings.refer_bonus,
                userId: refer._id,
                type: "refer",
            });
        }
    }
}

const register = async (req, res) => {
    const data = req.body;
    try {
        const settings = await getSetting();
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.findOne({
            $or: [
                { phone: data.phone },
                { email: data.email },
                { whatsapp: data.whatsapp },
            ],
        });

        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        let reference;
        if (data.reference) {
            reference = await User.findOne({
                userId: data.reference,
                status: "active",
            });
        }

        if (!reference && data.reference) {
            return res.status(404).json({ message: "Invalid Reference" });
        }

        const lastUser = await User.findOne().select({ userId: 1 }).sort({ _id: -1 }).exec();
        const userId = Number(lastUser.userId) + 1;

        const newUser = new User({
            ...data,
            password: hashedPassword,
            userId,
            "settings.sgl": reference && reference.settings.sgl ? reference.settings.sgl : "",
            "settings.gl": reference && reference.settings.gl ? reference.settings.gl : "",
            "settings.trainer": reference && reference.settings.trainer ? reference.settings.trainer : "",
        });

        const savedUser = await newUser.save();
        if (!savedUser) {
            return res.status(500).json({ message: "Failed to save user" });
        }

        // if (reference) {
        //     await createRefer(savedUser._id, reference._id);

        //     const isActivate = await referChecker(reference.userId);
        //     if (isActivate) {
        //         await User.findByIdAndUpdate(reference._id, {
        //             $inc: {
        //                 balance: settings.refer_bonus,
        //             },
        //         });
        //         await assignCradit({
        //             amount: settings.refer_bonus,
        //             source: "refer bonus",
        //             userId: savedUser.userId,
        //             user: reference._id,
        //         });
        //     }
        // }

        res.send(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = { register }