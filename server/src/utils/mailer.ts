import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
    const mailOptions = {
      from: `"Piccole Scelte" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email inviata con successo a: ${to}`);
  } catch (error) {
    console.error('❌ Errore invio email:', error);
  }
};