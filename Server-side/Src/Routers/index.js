module.exports = (app) => {
  app.use("/api/users", require("../modules/user/user.route"));
  app.use("/api/admin", require("../modules/admin/admin.route"));
  app.use("/api/sub-admin", require("../modules/sub-admin/subAdmin.route"));
  app.use("/api/upload", require("../modules/upload/upload.route"));
  app.use("/api/passbook", require("../modules/passbook/passbook.route"));
  app.use("/api/wallet", require("../modules/wallet/wallet.route"));
  app.use("/api/payment", require("../modules/payment/payment.route"));
  app.use("/api/withdraw", require("../modules/withdraw/withdraw.route"));
  app.use("/api/refer", require("../modules/referance/refer.route"));
  app.use("/api/requests", require("../modules/request/request.route"));
  app.use("/api/courses", require("../modules/courses/course.router"));
  app.use("/api/assignment", require("../modules/assignment/assignment.route"));
  app.use("/api/group", require("../modules/group/group.router"));
  app.use("/api/performer", require("../modules/bestPerformer/performer.router"));
  app.use("/api/notice", require("../modules/motice/notice.route"));
};
