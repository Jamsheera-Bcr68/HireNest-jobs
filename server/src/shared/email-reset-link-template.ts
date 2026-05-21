export const emailPasswordResetTemplate = (link: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Link</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 0;">
        <table width="100%" max-width="480px" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05); padding:30px;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="font-size:22px; font-weight:bold; color:#222;">
              HireNest Password Reset Link
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:20px 0; font-size:14px; color:#555; line-height:1.6;">
              Hello,<br/><br/>
              Use the following link for resetting your hirenest password.
              This code is valid for <strong>1 day</strong>.
            </td>
          </tr>

          <!-- Link Box -->
          <tr>
            
<td align="center" style="padding:15px 0;">
  <div style="font-size:14px; color:#2d6cdf;">
    <a href="${link}">${link}</a>
  </div>
</td>

          </tr>

          <!-- Warning -->
          <tr>
            <td style="padding:15px 0; font-size:13px; color:#777; line-height:1.5;">
          
              If you did not request this verification, please ignore this email.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px; font-size:12px; color:#999; text-align:center;">
              © 2026 HireNest. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
