const nodemailer = require('nodemailer');
async function run() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'johathan.doyle22@ethereal.email',
        pass: '6Mv1sTz7nEa3XJ1Z1A'
    }
  });
  console.log("sending");
  try {
    await transporter.sendMail({
      from: 'test@example.com',
      to: 'emilyghiba', // NO DOMAIN
      subject: 'x',
      text: 'x'
    });
    console.log("sent");
  } catch(e) {
    console.log("error", e.message);
  }
}
run();
