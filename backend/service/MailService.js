import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Activation acc on ${process.env.API_URL}`,
        text: '',
        html: `
              <div>
                <h1>For activation link to</h1>
                <a href="${link}"}>${link}</a>
              </div>
            `,
      });
    } catch (e) {
      return console.log(e);
    }
  }
}

export default new MailService();
