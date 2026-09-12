import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    // Creiamo la mail con l'intestazione standard
    const rawMessage = [
      `From: Piccole Scelte <${process.env.GMAIL_USER}>`,
      `To: ${to}`,
      'Content-Type: text/plain; charset=utf-8',
      `Subject: ${subject}`,
      '',
      text,
    ].join('\n');

    // Le API di Google vogliono il messaggio codificato in Base64 (formato URL-safe)
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