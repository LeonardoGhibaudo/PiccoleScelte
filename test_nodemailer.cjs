const nodemailer = require('nodemailer');
async function run() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'test@gmail.com', pass: 'abcd' }
  });
  console.log("sending");
  try {
    await transporter.sendMail({
      from: 'test',
      to: 'invalidemail', // NO DOMAIN
      subject: 'x',
      text: 'x'
    });
    console.log("sent");
  } catch(e) {
    console.log("error", e.message);
  }
}
run();
