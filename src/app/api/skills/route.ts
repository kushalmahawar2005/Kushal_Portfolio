import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Skill } from '@/models/Skill';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const skill = await Skill.create(body);
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    const skill = await Skill.findByIdAndUpdate(id, updateData, { new: true });
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Skill ID is required' },
        { status: 400 }
      );
    }

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
} 