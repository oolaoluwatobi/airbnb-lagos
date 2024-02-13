import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function GET(request: Request) {
  console.log("GETTING...")
  
  try {
    const date = Date.now()

    const test = () => {
      return (
        <div>
          <h1>Hello World! This is a custom response for the GET request.</h1>
          <p>{date}</p>
        </div>
      )
    }

    const tester = test.toString()
    
  return Response.json(tester, { headers: { 'Content-Type': 'text/html' } })
  } catch (error: any) {
    console.log('ERROR :', error, error?.message)
    return NextResponse.json({ 'Error': 'Something went wrong, failed to create date' })
  }

}