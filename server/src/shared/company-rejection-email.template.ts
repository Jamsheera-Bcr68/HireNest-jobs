export const companyRejectionEmailTemplate = (
  name: string,
  companyName: string,
  rejectionReason: string,
  reapplyCount: number
) => {
  const canReapply = reapplyCount < 3;
  const remainingAttempts = 3 - reapplyCount;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Company Registration Update</title>
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
            max-width:520px;
            background:#ffffff;
            border-radius:12px;
            box-shadow:0 4px 12px rgba(0,0,0,0.06);
            overflow:hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                padding:25px 20px;
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
              Company Registration Update
            </td>
          </tr>

          <!-- Greeting & Message -->
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

              Thank you for submitting your company registration
              application to HireNest.
              After reviewing your application, we’re unable to approve
              it at this time.
            </td>
          </tr>

          <!-- Rejection Reason -->
          <tr>
            <td style="padding:15px 30px;">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#fff5f5;
                  border-left:4px solid #dc2626;
                  border-radius:6px;
                "
              >
                <tr>
                  <td
                    style="
                      padding:15px;
                      font-size:14px;
                      color:#444444;
                      line-height:1.6;
                    "
                  >
                    <strong style="color:#dc2626;">
                      Reason for Rejection
                    </strong>

                    <br/><br/>

                    ${rejectionReason}
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          ${
            canReapply
              ? `
          <!-- Reapply Information -->
          <tr>
            <td
              style="
                padding:15px 30px;
                font-size:14px;
                color:#555555;
                line-height:1.7;
              "
            >
              You can review the rejection reason, make the necessary
              corrections, and submit your company application again.

              <br/><br/>

              <strong style="color:#701a75;">
                Remaining reapplication attempts:
                ${remainingAttempts}
              </strong>
            </td>
          </tr>

          <!-- Reapply Notice -->
          <tr>
            <td
              style="
                padding:10px 30px 25px;
                font-size:13px;
                color:#777777;
                line-height:1.6;
              "
            >
              Please log in to your HireNest account and update your
              company information before submitting the application
              for review again.
            </td>
          </tr>
          `
              : `
          <!-- Maximum Attempts -->
          <tr>
            <td style="padding:15px 30px 30px;">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background:#fff7ed;
                  border-left:4px solid #f97316;
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
                    <strong style="color:#ea580c;">
                      Maximum Reapplication Attempts Reached
                    </strong>

                    <br/><br/>

                    You have reached the maximum of
                    <strong>3 reapplication attempts</strong>
                    allowed for company verification.
                  </td>
                </tr>
              </table>

            </td>
          </tr>
          `
          }

          <!-- Support -->
          <tr>
            <td
              style="
                padding:0 30px 25px;
                font-size:13px;
                color:#777777;
                line-height:1.6;
              "
            >
              If you believe this decision was made in error or need
              clarification regarding the rejection, please contact
              the HireNest support team.
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
</html>`;
};
