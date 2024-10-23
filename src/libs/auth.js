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
          placeholder: 'user@email.com' },
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
          name: userFound.username,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
