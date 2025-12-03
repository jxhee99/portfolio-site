// app/api/send/route.ts
import { Resend } from "resend"
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // 무료 플랜 기본 주소
      to: 'wngml2666@gmail.com',
      subject: `[포트폴리오] ${name}님의 문의`,
      replyTo: email,
      html: `
        <h2>포트폴리오 문의</h2>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>메시지:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    })
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}