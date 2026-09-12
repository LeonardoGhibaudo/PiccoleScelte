const nodemailer = require('nodemailer');

async function run() {
  console.log("Starting");
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: undefined,
          pass: undefined,
      }
  });

  try {
      await transporter.sendMail({
          from: 'test@example.com',
          to: 'test@example.com',
          subject: 'Test',
          text: 'test'
      });
      console.log("Sent");
  } catch (err) {
      console.log("Error:", err.message);
  }
}
run();
