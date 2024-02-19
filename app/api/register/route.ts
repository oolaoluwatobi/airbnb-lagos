import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const body = await request.json()

  const { email, name, password } = body
  console.log(email, name, password)
  const hashedPassword = await bcrypt.hash(password, 12)
  console.log(email, name, hashedPassword)
  
    // Check if the email is already taken
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      // return res.status(409).json({ message: 'Email has already been taken' });
      // If the condition is met, return a response with a 409 status code
      return NextResponse.json({ message: 'Email has already been taken' }, { status: 409 });
    }
  
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