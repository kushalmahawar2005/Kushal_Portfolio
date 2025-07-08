import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const EXPERIENCE_PATH = path.join(process.cwd(), 'src/data/experience.json')

// Helper to read all experiences
async function readExperiences() {
  try {
    const file = await fs.readFile(EXPERIENCE_PATH, 'utf-8')
    return JSON.parse(file)
  } catch {
    return []
  }
}

// Helper to write all experiences
async function writeExperiences(data: any) {
  await fs.writeFile(EXPERIENCE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET() {
  const experiences = await readExperiences()
  return NextResponse.json(experiences, { status: 200 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const experiences = await readExperiences()
    const newExp = {
      ...body,
      id: Date.now(),
    }
    experiences.unshift(newExp)
    await writeExperiences(experiences)
    return NextResponse.json(newExp, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add experience' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...update } = body
    let experiences = await readExperiences()
    experiences = experiences.map((exp: any) => exp.id === id ? { ...exp, ...update } : exp)
    await writeExperiences(experiences)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    let experiences = await readExperiences()
    experiences = experiences.filter((exp: any) => exp.id !== id)
    await writeExperiences(experiences)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
} 