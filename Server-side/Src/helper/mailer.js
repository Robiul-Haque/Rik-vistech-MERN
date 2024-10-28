const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "dynamicsk@Gmail.com",
        pass: "holc oofw racf",
    },
});

const passwordResetMail = (email, password) => {
    const mailOptions = {
        from: "dynamicskillbaseelearningpoint@Gmail.com", // Replace this with a valid email address
        to: email,
        subject: "Password Reset",
        html: `
        <div>
        <h1>Your password Reset link : <strong>
        <a href="${`https://dynamicskillbase.com/reset?email=${email}&&code=${password}`}" target="_blank">
        Click to chnage password
        </a>
        </strong></h1>
        </div>
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}


module.exports = {
    passwordResetMail
    // sendMail
}