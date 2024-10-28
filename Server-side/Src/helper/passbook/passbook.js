
const Passbook = require("../../modules/passbook/passbook.model");
const User = require("../../modules/user/user.model");
const assignCradit = async (data) => {
  if (data.user.length < 20) {
    const user = await User.findOne({ userId: data.user });
    data.user = user._id;
    const newCradit = new Passbook({
      type: "cradit",
      ...data
    });
    return await newCradit.save();
  }
  else {
    const newCradit = new Passbook({
      type: "cradit",
      ...data
    });
    return await newCradit.save();

  }

};
const assignDebit = async (user, data) => {
  const newData = {
    amount: data.amount,
    source: data.source,
    method: data.method,
    status: data.status,
    date: new Date(),
  };
  const passbook = await Passbook.findOneAndUpdate(
    { user: user },
    { $push: { debit: newData } },
    { new: true }
  );
  return passbook;
};
module.exports = {
  assignCradit,
  assignDebit,
};
