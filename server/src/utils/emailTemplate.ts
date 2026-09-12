export const getEmailTemplate = (title: string, message: string, buttonText?: string, buttonUrl?: string) => {
  const logoUrl = "https://piccolescelte.com/logo.jpg";
  const bgImage = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600&auto=format&fit=crop"; 
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 0; }
        .wrapper { padding: 40px 10px; background-color: #f4f7f6; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background-color: #4FD1C5; background-image: linear-gradient(135deg, #4FD1C5 0%, #38B2AC 100%); padding: 40px 20px; text-align: center; }
        .logo { width: 90px; height: 90px; border-radius: 22px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); border: 3px solid white; object-fit: cover; }
        .content { padding: 40px 30px; color: #4a5568; line-height: 1.7; font-size: 16px; }
        .title { font-size: 26px; font-weight: 800; color: #2d3748; margin-bottom: 25px; text-align: center; letter-spacing: -0.5px; }
        .button-container { text-align: center; margin-top: 35px; margin-bottom: 15px; }
        .button { display: inline-block; background-color: #ed8936; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 10px rgba(237, 137, 54, 0.3); }
        .footer { background-color: #f8fafc; padding: 25px; text-align: center; font-size: 13px; color: #a0aec0; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <img src="${logoUrl}" alt="Piccole Scelte Logo" class="logo" />
          </div>
          <div class="content">
            <div class="title">${title}</div>
            <div style="font-size: 16px;">${message.replace(/\n/g, '<br/>')}</div>
            ${buttonText && buttonUrl ? `
              <div class="button-container">
                <a href="${buttonUrl}" class="button" style="color: white;">${buttonText}</a>
              </div>
            ` : ''}
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Piccole Scelte.<br>Un videogioco terapeutico per esplorare le emozioni.<br><br>
            <a href="https://piccolescelte.com" style="color: #4FD1C5; text-decoration: none; font-weight: bold;">Visita il sito web</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
