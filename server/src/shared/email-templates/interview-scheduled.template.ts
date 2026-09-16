export const interviewScheduledEmailTemplate = (
  name: string,
  jobTitle: string,
  companyName: string,
  interviewDate: string,
  interviewTime: string,
  interviewType: 'online' | 'offline',
  meetLink?: string,
  location?: string
) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Interview Scheduled</title>
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
              Interview Scheduled 🎉
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

              Great news! Your interview for the
              <strong>${jobTitle}</strong> position at
              <strong>${companyName}</strong> has been scheduled.
            </td>
          </tr>

          <!-- Interview Details -->
          <tr>
            <td style="padding:15px 30px;">

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
                      padding:18px;
                      font-size:14px;
                      color:#555555;
                      line-height:1.8;
                    "
                  >

                    <strong style="color:#701a75;">
                      Interview Details
                    </strong>

                    <br/><br/>

                    <strong>Position:</strong>
                    ${jobTitle}

                    <br/>

                    <strong>Company:</strong>
                    ${companyName}

                    <br/>

                    <strong>Date:</strong>
                    ${interviewDate}

                    <br/>

                    <strong>Time:</strong>
                    ${interviewTime}

                    <br/>

                    <strong>Type:</strong>
                    ${
                      interviewType === 'online'
                        ? 'Online Interview'
                        : 'In-Person Interview'
                    }

                    ${
                      interviewType === 'online' && meetLink
                        ? `
                    <br/><br/>

                    <a
                      href="${meetLink}"
                      style="
                        display:inline-block;
                        padding:10px 18px;
                        background:#701a75;
                        color:#ffffff;
                        text-decoration:none;
                        border-radius:6px;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Join Interview
                    </a>
                    `
                        : ''
                    }

                    ${
                      interviewType === 'offline' && location
                        ? `
                    <br/>

                    <strong>Location:</strong>
                    ${location}
                    `
                        : ''
                    }

                  </td>
                </tr>

              </table>

            </td>
          </tr>

          <!-- Reminder -->
          <tr>
            <td
              style="
                padding:15px 30px;
                font-size:13px;
                color:#777777;
                line-height:1.6;
              "
            >
              Please make sure you are available at the scheduled time
              and be prepared for your interview.
              ${
                interviewType === 'online'
                  ? 'We recommend checking your camera, microphone, and internet connection beforehand.'
                  : 'Please arrive at the interview location a few minutes early.'
              }
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td
              style="
                padding:10px 30px 30px;
                font-size:14px;
                color:#555555;
                line-height:1.7;
              "
            >
              We wish you the very best for your interview!

              <br/><br/>

              Best regards,<br/>
              <strong>HireNest Team</strong>
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