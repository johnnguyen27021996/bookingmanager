function sendMail(email_receive, subject, template_name, message) {
    const nodemailer = require('nodemailer');
    const ejs = require('ejs');

    let transporter = nodemailer.createTransport({
        host: 'smtp.ggmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    ejs.renderFile('views/template_mails/' + template_name, {
        message: message
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let option = {
                from: '"ADMIN" <admin@adminbm.com>', // sender address
                to: email_receive,
                subject: subject,
                html: data
            }

            transporter.sendMail(option);
        }
    });
}

module.exports = sendMail;