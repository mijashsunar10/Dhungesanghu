import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL } = process.env;

export async function sendContactAlertEmail(messageData) {
  const { name, email, subject, message } = messageData;

  // Verify if credentials exist
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !ADMIN_EMAIL) {
    console.log('\n======================================================');
    console.log('[Nodemailer Alert] SMTP settings are missing in .env.');
    console.log('Logging contact message locally instead:');
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject || 'No Subject'}`);
    console.log(`Message: ${message}`);
    console.log('======================================================\n');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    const mailOptions = {
      from: `"${name} (School Contact Form)" <${SMTP_USER}>`,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Dhungesanghu Website] Contact Message: ${subject || 'General Inquiry'}`,
      text: `You have received a new message from the school contact form.\n\n` +
            `Sender Name: ${name}\n` +
            `Sender Email: ${email}\n` +
            `Subject: ${subject || 'N/A'}\n\n` +
            `Message Details:\n${message}\n\n` +
            `---\n` +
            `This is an automated notification from Dhungesanghu Boarding School.`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <h2 style="color: #652d90; border-bottom: 2px solid #652d90; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          <p style="font-size: 14px; color: #475569;">You have received a new inquiry from the school website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b; width: 120px;">Sender Name:</td>
              <td style="padding: 8px 0; color: #334155;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Sender Email:</td>
              <td style="padding: 8px 0; color: #334155;"><a href="mailto:${email}" style="color: #652d90;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Subject:</td>
              <td style="padding: 8px 0; color: #334155;">${subject || 'General Inquiry'}</td>
            </tr>
          </table>

          <div style="background-color: #ffffff; border-left: 4px solid #652d90; padding: 15px; margin: 20px 0; border-radius: 4px; font-size: 14px; color: #334155; line-height: 1.6;">
            <strong>Message Details:</strong><br/>
            ${message.replace(/\n/g, '<br/>')}
          </div>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            This is an automated notification from the Dhungesanghu Boarding School website administrator portal.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer] Alert email sent successfully: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error('[Nodemailer Alert] Error sending alert email:', err.message);
  }
}
