import nodemailer from 'nodemailer';

export type EmailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

export function getEmailConfig(): EmailConfig | null {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : undefined;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!host || !port || !user || !pass || !from || !to) {
    console.warn('\n⚠️  Email non configuré — définis EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM, EMAIL_TO dans .env.local');
    console.warn('   (Brevo SMTP: smtp-relay.brevo.com, port 587, user = ton email, pass = ta clé SMTP Brevo)\n');
    return null;
  }

  return { host, port, user, pass, from, to };
}

export async function sendReviewEmail(
  config: EmailConfig,
  article: { title: string; description: string; slug: string; filePath: string },
): Promise<void> {
  const articleUrl = `http://localhost:3000/blog/${article.slug}`;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: { user: config.user, pass: config.pass },
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Inter, sans-serif; color: #1B3A4B; background: #FAF6F0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px; border: 1px solid #E2DCD3;">
    <h1 style="font-family: 'Cormorant Garamond', serif; color: #0F2B3D; font-size: 28px; margin: 0 0 8px;">
      🖋 Nouvel article généré
    </h1>
    <p style="color: #6B7280; font-size: 14px; margin: 0 0 24px;">
      Un article a été généré automatiquement. Il est enregistré comme <strong>brouillon</strong> (published: false).
    </p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: 600; color: #1F6E5C; width: 100px;">Titre</td>
        <td style="padding: 8px 0;">${article.title}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600; color: #1F6E5C;">Description</td>
        <td style="padding: 8px 0;">${article.description}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600; color: #1F6E5C;">Slug</td>
        <td style="padding: 8px 0; font-family: monospace;">${article.slug}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: 600; color: #1F6E5C;">Fichier</td>
        <td style="padding: 8px 0; font-family: monospace; font-size: 13px;">${article.filePath}</td>
      </tr>
    </table>

    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E2DCD3;">
      <p style="font-size: 14px; margin: 0 0 12px;"><strong>Actions :</strong></p>
      <ol style="font-size: 14px; margin: 0; padding-left: 20px;">
        <li>Relis l'article dans <code>content/blog/${article.slug}.mdx</code></li>
        <li>Passe <code>published: true</code> dans le frontmatter pour le publier</li>
        <li>Commit et push</li>
      </ol>
    </div>

    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #E2DCD3; font-size: 13px; color: #9CA3AF;">
      <p style="margin: 0;">Généré automatiquement le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  </div>
</body>
</html>`.trim();

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: `[Me Retrouver] Nouvel article à relire : ${article.title}`,
    html,
  });

  console.log(`✅ Email envoyé à ${config.to}`);
}
