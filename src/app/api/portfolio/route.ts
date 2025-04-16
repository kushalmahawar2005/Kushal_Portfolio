import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'src/data/portfolio.json')

// Helper function to read data
function readData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {
      projects: [],
      skills: [],
      experience: [],
      certificates: [],
      messages: []
    }
  }
}

// Helper function to write data
function writeData(data: any) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing data:', error)
    return false
  }
}

// GET all portfolio data
export async function GET() {
  try {
    const data = readData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

// POST new data
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const currentData = readData()
    
    switch (type) {
      case 'project':
        currentData.projects.push({
          id: Date.now(),
          ...data,
          createdAt: new Date().toISOString()
        })
        break
      case 'skill':
        currentData.skills.push({
          id: Date.now(),
          ...data
        })
        break
      case 'experience':
        currentData.experience.push({
          id: Date.now(),
          ...data
        })
        break
      case 'certificate':
        currentData.certificates.push({
          id: Date.now(),
          ...data
        })
        break
      case 'message':
        currentData.messages.push({
          id: Date.now(),
          ...data,
          createdAt: new Date().toISOString(),
          read: false
        })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (writeData(currentData)) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

// PUT update data
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { type, id, data } = body

    if (!type || !id || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const currentData = readData()
    let updated = false

    switch (type) {
      case 'project':
        currentData.projects = currentData.projects.map((project: any) => {
          if (project.id === id) {
            updated = true
            return { ...project, ...data }
          }
          return project
        })
        break
      case 'skill':
        currentData.skills = currentData.skills.map((skill: any) => {
          if (skill.id === id) {
            updated = true
            return { ...skill, ...data }
          }
          return skill
        })
        break
      case 'experience':
        currentData.experience = currentData.experience.map((exp: any) => {
          if (exp.id === id) {
            updated = true
            return { ...exp, ...data }
          }
          return exp
        })
        break
      case 'certificate':
        currentData.certificates = currentData.certificates.map((cert: any) => {
          if (cert.id === id) {
            updated = true
            return { ...cert, ...data }
          }
          return cert
        })
        break
      case 'message':
        currentData.messages = currentData.messages.map((msg: any) => {
          if (msg.id === id) {
            updated = true
            return { ...msg, ...data }
          }
          return msg
        })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (writeData(currentData)) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

// DELETE data
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const currentData = readData()
    let deleted = false

    switch (type) {
      case 'project':
        currentData.projects = currentData.projects.filter((project: any) => {
          if (project.id === Number(id)) {
            deleted = true
            return false
          }
          return true
        })
        break
      case 'skill':
        currentData.skills = currentData.skills.filter((skill: any) => {
          if (skill.id === Number(id)) {
            deleted = true
            return false
          }
          return true
        })
        break
      case 'experience':
        currentData.experience = currentData.experience.filter((exp: any) => {
          if (exp.id === Number(id)) {
            deleted = true
            return false
          }
          return true
        })
        break
      case 'certificate':
        currentData.certificates = currentData.certificates.filter((cert: any) => {
          if (cert.id === Number(id)) {
            deleted = true
            return false
          }
          return true
        })
        break
      case 'message':
        currentData.messages = currentData.messages.filter((msg: any) => {
          if (msg.id === Number(id)) {
            deleted = true
            return false
          }
          return true
        })
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    if (!deleted) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (writeData(currentData)) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
} 