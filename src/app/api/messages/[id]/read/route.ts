import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Message from '@/models/Message'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const message = await Message.findByIdAndUpdate(
      params.id,
      { read: true },
      { new: true }
    )

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: message })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to mark message as read' },
      { status: 500 }
    )
  }
} 