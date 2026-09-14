import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  try {
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      console.warn(`[MAILER WARN] Cannot send email to ${to} - GMAIL_REFRESH_TOKEN is missing in .env`);
      return; // Skip silently or handle as needed
    }

    const rawMessage = [
      `From: Piccole Scelte <${process.env.GMAIL_USER}>`,
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      `Subject: ${subject}`,
      '',
      htmlContent,
    ].join('\n');

    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Inviamo la mail via API HTTPS (aggirando il blocco porta di Render)
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(`✅ Email API inviata con successo a: ${to}`);
  } catch (error: any) {
    console.error('❌ Errore invio email Gmail API:', error.message);
  }
};