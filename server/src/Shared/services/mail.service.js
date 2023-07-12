const nodemailer = require('nodemailer');

module.exports = class MailService {
    transporter = nodemailer.createTransport({
        host: "smtp.kinghost.net",
        port: 465,
        secure: true,
        auth: {
            user: "contato@nox.technoxinformatica.com.br",
            pass: process.env.DEFAULT_MAIL_PASS.toString()
        },
        tls: { rejectUnauthorized: false }
    });

    sendMail(to, template) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: 'contato@nox.technoxinformatica.com.br',
                to: [to, 'victorfergs@hotmail.com'],
                subject: template.subject,
                sender: 'Editor de Caneca',
                priority: "high",
                html: template.htmlTemplate
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ sended: true, info });
                }
            });
        });
    }
}