import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Message from '@/models/Message'

export async function GET() {
  try {
    await connectDB()
    const messages = await Message.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: messages })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const message = await Message.create(body)
    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create message' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      )
    }

    const message = await Message.findByIdAndDelete(id)
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
} 