import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import db from '@/libs/db';
import { omit } from 'lodash';

export async function POST(request) {
  try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists',
        },
        {
          status: 400,
        },
      );
    }

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: 'username already exists',
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        name: data.name, //se agrega el campo name
        lastName: data.lastName, //se agrega el campo lastname
        username: data.username,
        email: data.email,
        password: hashedPassword,
        owner: data.owner || false,
      },
    });

    // const { password: _, ...user } = newUser;

    // para excluir la contraseña
    const user = omit(newUser, ['password']);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
