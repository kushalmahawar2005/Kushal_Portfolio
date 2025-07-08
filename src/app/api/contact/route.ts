import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

const MESSAGES_PATH = path.join(process.cwd(), 'src/data/messages.json')

// Configure nodemailer transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, // Your Gmail address
    pass: process.env.SMTP_PASS, // App password
  },
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString(),
      read: false,
    }
    // Read existing messages
    let messages = []
    try {
      const file = await fs.readFile(MESSAGES_PATH, 'utf-8')
      messages = JSON.parse(file)
    } catch (e) {
      messages = []
    }
    // Append new message
    messages.unshift(newMessage)
    await fs.writeFile(MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf-8')

    // Send email notification
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'Kushalmahawar114@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h2>New Contact Message</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message}</p>`
    })

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { message: 'Failed to send message' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const file = await fs.readFile(MESSAGES_PATH, 'utf-8')
    const messages = JSON.parse(file)
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
} 