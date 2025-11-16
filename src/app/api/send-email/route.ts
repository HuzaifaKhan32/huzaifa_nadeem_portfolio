import { NextResponse } from "next/server";
import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY)
const resend = new Resend("re_LxQNpRBw_EFSJDXTuK3iqaqx7Sq2GYmph")
// console.log(process.env.RESEND_API_KEY)
export async function POST(request: Request) {
    try {
      const { fname, lname, phoneNumber, email, message } = await request.json();
      
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["huzaifakhan0856551@gmail.com"], 
        subject: `New message from ${fname} ${lname}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${fname} ${lname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phonenumber:</strong> ${phoneNumber}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
  
      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
  
      return NextResponse.json(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {

      console.error("Server Error", error)
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }