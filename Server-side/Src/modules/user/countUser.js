const { userIgnoreFeilds } = require("../../options");
const User = require("./user.model");

const countStatistics = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 30;
    const skipIndex = (page - 1) * limit;
    const filters = req.body;
    try {
        const query = {};
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (filters[key] !== "") {
                    query[key] = filters[key];
                }
            });
        }

        const date = new Date();
        const start = query["startDate"]
            ? new Date(query["startDate"])
            : new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const end = query["endDate"]
            ? new Date(query["endDate"])
            : new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4);
        const thisMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
        if (query["startDate"] || query["endDate"] || Object.keys(query).length === 0) {
            query["createdAt"] = {
                $gte: start, // Today at midnight
                $lt: end,
            };
            // remove start and end
            delete query["startDate"];
            delete query["endDate"];
        }
        // query["role"] = "user";
        const filter = {
            ...query,
        };

        const users = await User.find(filter)
            .select(userIgnoreFeilds)
            .sort({ createdAt: -1 }) // sort by createdAt in descending order (newest first)
            .limit(limit)
            .skip(skipIndex)
            .exec();
        // active data of today
        const todayActive = await User.countDocuments({ ...filter, "settings.activates": { $gte: start, $lt: end } });
        // active data of this month
        const monthActive = await User.countDocuments({ ...filter, "settings.activates": { $gte: thisMonthStart, $lt: end } });
        // data of this month
        const month = await User.countDocuments({ ...filter, createdAt: { $gte: thisMonthStart, $lt: end } });
        // data of this day
        const today = await User.countDocuments({ ...filter, createdAt: { $gte: start, $lt: end } });
        const totalDocuments = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalDocuments / limit);
        const active = await User.countDocuments({ ...filter, status: "active" });
        const inactive = await User.countDocuments({ ...filter, status: "inactive" });
        res.status(200).json({
            count: totalDocuments,
            totalPages: totalPages,
            currentPage: page,
            fast: limit * page,
            length: users.length,
            todayActive,
            monthActive,
            today,
            month,
            active,
            inactive,
            data: users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { countStatistics }