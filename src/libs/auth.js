import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'user@email.com',
        },
        password: { label: 'Password', type: 'password', placeholder: '*****' },
      },
      async authorize(credentials) {
        // console.log(credentials)

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error('No user found');

        // console.log(userFound)

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );

        if (!matchPassword) throw new Error('Wrong password');

        return {
          id: userFound.id + '',
          username: userFound.username,
          email: userFound.email,
          owner: userFound.owner,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.owner = user.owner;
        token.username = user.username;
        token.name = user.name;
        token.lastname = user.lastname;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.user.id = token.sub;
        session.user.id = +token.id;
        session.user.owner = token.owner;
        session.user.username = token.username;
        session.user.name = token.name;
        session.user.lastname = token.lastname;
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};
