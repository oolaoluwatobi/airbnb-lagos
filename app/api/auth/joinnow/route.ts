import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/register`;

const API_KEY: string = process.env.DATA_API_KEY as string;

const MAX_AGE = 60 * 60 * 24 * 30; // days;

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, phone_number, date_of_birth, password  } = body;

  if (!email || !password || !name || !phone_number || !date_of_birth)
    return NextResponse.json(
      {
        message: "Missing required data",
      },
      {
        status: 400,
      }
    );


    // console.log(email)
    
  const res = await fetch(DATA_SOURCE_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email, name, phone_number, date_of_birth, password
    })
  });

  const loggedUser = await res.json();
  // console.log(loggedUser);
  // console.log(loggedUser?.token, 'token')

  // Always check this
  const secret = process.env.DATA_API_KEY || "";

  const token = sign(
    {
      email,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  // const seralized = serialize(COOKIE_NAME, token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: MAX_AGE,
  //   path: "/",
  // });
  const acsTkn = `Bearer ${loggedUser.token}`

  const auth = `Authorization ${acsTkn}` 
  console.log(auth) 
  
  // const seralized = serialize(COOKIE_NAME, 'Bearer ' + loggedUser.token);
  const seralized = serialize(COOKIE_NAME, acsTkn);

  const response = {
    message: `${loggedUser.message}`,
    // message: "Authenticated!",
  };

  const headers = new Headers();
  headers.append("authToken", `${loggedUser.token}`);
  headers.append("Authorization", `Bearer ${loggedUser.token}`);


  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": seralized },
    // headers: headers,
  });
}


