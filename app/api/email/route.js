import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "kamsura01@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  console.log(data)

  return NextResponse.json({ data }, { status: 200 });
}
