import Nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, auth, secure } = mailConfig;
    this.transporter = Nodemailer.createTransport({
      host,
      port,
      auth: auth.user ? auth : null,
      secure,
    });
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
