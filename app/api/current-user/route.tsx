import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function GET(request: Request) {
  console.log("GETTING...")
  
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized", status: 401, data: null })
    }

    
  return NextResponse.json({ message: "Success", status: 200, data: currentUser })
  } catch (error: any) {
    console.log('ERROR :', error, error?.message)
    return NextResponse.json({ 'Error': 'Something went wrong, failed to get user' })
  }

}