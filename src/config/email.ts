import nodemailer from 'nodemailer';

const emailConfig = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'plataforma.dcode@gmail.com',
    pass: 'fatecanos',
  },
});

export default emailConfig;
