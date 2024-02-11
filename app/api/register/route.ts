import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const body = await request.json()

  const { email, name, password } = body
  console.log(email, name, password)
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(email, name, hashedPassword)
  
  try {
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })
    return NextResponse.json(user)
  } catch (error: any) {
    console.log('ERROR :', error, error?.message)
    return NextResponse.json({ 'Error': 'Something went wrong, failed to create user' })
  }

}

export async function GET(request: Request) {
  console.log("GETTING...")
  
  try {
    const date = Date.now()
    return NextResponse.json(date)
  } catch (error: any) {
    console.log('ERROR :', error, error?.message)
    return NextResponse.json({ 'Error': 'Something went wrong, failed to create date' })
  }

}