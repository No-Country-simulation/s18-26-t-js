// Archivo creado para cargar usuarios de forma rapida 
import { NextResponse } from 'next/server'
import db from "@/libs/db";

export async function POST(request) {
  try {
    const {username, email, password} = await request.json();
    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      }
    });
    
  
    return NextResponse.json(newUser)

  } catch {
    return NextResponse.json({
      message: 'Fail'
    }, {
      status: 400
    })
  }
}