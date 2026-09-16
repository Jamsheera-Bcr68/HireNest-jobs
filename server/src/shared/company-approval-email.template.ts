export const companyApprovalEmailTemplate = (
  name: string,
  companyName: string
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Company Registration Approved</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 15px;">

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width:500px;
            background:#ffffff;
            border-radius:10px;
            box-shadow:0 4px 10px rgba(0,0,0,0.05);
            overflow:hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                padding:25px;
                background:#701a75;
                color:#ffffff;
                font-size:22px;
                font-weight:bold;
              "
            >
              HireNest
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td
              style="
                padding:30px 30px 10px;
                font-size:20px;
                font-weight:bold;
                color:#222222;
              "
            >
              Company Registration Approved 🎉
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td
              style="
                padding:10px 30px;
                font-size:14px;
                color:#555555;
                line-height:1.7;
              "
            >
              Hello <strong>${name}</strong>,<br/><br/>

              Great news! Your company registration request for
              <strong>${companyName}</strong> has been successfully
              reviewed and approved by the HireNest admin team.
            </td>
          </tr>

          <!-- Approved Status -->
          <tr>
            <td align="center" style="padding:15px 30px;">

              <div
                style="
                  display:inline-block;
                  padding:8px 20px;
                  border-radius:20px;
                  background:#dcfce7;
                  color:#15803d;
                  font-size:13px;
                  font-weight:bold;
                "
              >
                ✓ Registration Approved
              </div>

            </td>
          </tr>

          <!-- Main Message -->
          <tr>
            <td
              style="
                padding:15px 30px;
                font-size:14px;
                color:#555555;
                line-height:1.7;
              "
            >
              Your company is now verified on HireNest. You can start
              using your company account to create job opportunities,
              manage applications, and connect with talented candidates.
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding:10px 30px 20px;">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#faf5ff;
                  border-left:4px solid #701a75;
                  border-radius:6px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:15px;
                      font-size:14px;
                      color:#555555;
                      line-height:1.6;
                    "
                  >
                    <strong style="color:#701a75;">
                      What's next?
                    </strong>

                    <br/><br/>

                    Log in to your HireNest account and complete your
                    company profile to get started.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td
              style="
                padding:5px 30px 30px;
                font-size:14px;
                color:#555555;
                line-height:1.7;
              "
            >
              Thank you for choosing HireNest. We look forward to
              helping you find the right talent for your organization.

              <br/><br/>

              Best regards,<br/>
              <strong>HireNest Admin Team</strong>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding:20px;
                background:#f8fafc;
                font-size:12px;
                color:#999999;
              "
            >
              © 2026 HireNest. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;