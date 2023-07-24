import MessageEmail from '@/components/emails';
import type { NextApiRequest, NextApiResponse } from 'next';
import {Resend} from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_EMAIL_KEY);

export interface IEmail {
  name: string;
  email: string;
  message: string;
}

// Notice from where NextResponse is imported:
import { NextResponse } from "next/server";
import { mailOptions, transporter } from '@/utils/nodemailer';

// Notice the function definition:
// export async function POST(req: Request) {
//     const {name, email, message} = await req.json() as IEmail;
//     await resend.sendEmail({
//      from: 'onboarding@resend.dev',
//      to: 'hanifadedotun2k19@gmail.com',
//      subject: 'You have a new message',
//      react: MessageEmail({name, email, message}),
    //  }).then(() => {
    //   return NextResponse.json({ response: 'Successfull' }, { status: 200 });
    //  }).catch(() => {
    //   return NextResponse.json({ response: 'Unsuccessful' }, { status: 500 });
    //  })
 
// }
const htmlData = ({name, message, email}:IEmail) => {
  return `
  <!DOCTYPE html>
<html>
  <head>
    <title></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      @media screen and (max-width: 525px) {
        .wrapper {
          width: 100% !important;
          max-width: 100% !important;
        }
        .responsive-table {
          width: 100% !important;
        }
        .padding {
          padding: 10px 5% 15px 5% !important;
        }
        .section-padding {
          padding: 0 15px 50px 15px !important;
        }
      }
      .form-container {
        margin-bottom: 24px;
        padding: 20px;
        border: 1px dashed #ccc;
      }
      .form-heading {
        color: #2a2a2a;
        font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        text-align: left;
        line-height: 20px;
        font-size: 18px;
        margin: 0 0 8px;
        padding: 0;
      }
      .form-answer {
        color: #2a2a2a;
        font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-weight: 300;
        text-align: left;
        line-height: 20px;
        font-size: 16px;
        margin: 0 0 24px;
        padding: 0;
      }
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    </style>
  </head>
  <body style="margin: 0 !important; padding: 0 !important; background: #fff">
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    ></div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td
          bgcolor="#ffffff"
          align="center"
          style="padding: 10px 15px 30px 15px"
          class="section-padding"
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 500px"
            class="responsive-table"
          >
            <tr>
              <td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellspacing="0"
                        cellpadding="0"
                      >
                        <tr>
                          <td
                            style="
                              padding: 0 0 0 0;
                              font-size: 16px;
                              line-height: 25px;
                              color: #232323;
                            "
                            class="padding message-content"
                          >
                            <h2>New Contact Message from ${name} with email ${email}</h2>
                            <div class="form-container">${message}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `
}
export async function POST(req: Request) {
  const {name, email, message} = await req.json() as IEmail;
  await transporter.sendMail({
    ...mailOptions,
    subject: `New Message from ${name}`,
    text:"A new ITX Message",
    html: htmlData({name, email, message})
  }).then(() => {
    return NextResponse.json({ response: 'Successfull' }, { status: 200 });
   }).catch((e) => {
    console.log(e);
    return NextResponse.json({ response: 'Unsuccessful' }, { status: 500 });
   })

}
