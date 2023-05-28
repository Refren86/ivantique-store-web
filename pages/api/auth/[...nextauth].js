// here will be handled all the sign in/sign out/auth check requests
import NextAuth from 'next-auth';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { dbConnection } from 'lib/db';
import UserModel from 'models/User.model';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // filling token with data from db
      if (user?._id) token._id = user._id; // creating token based on user id
      if (user?.role) token.role = user.role; // also store inside token user role

      return token;
    },
    async session({ session, token }) {
      // filling session with token data
      if (token?._id) session.user._id = token._id;
      if (token?.role) session.user.role = token.role;

      return session;
    },
  },
  providers: [
    // credentials provider for authenticating the user
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnection();

        const user = await UserModel.findOne({
          email: credentials.email,
        });

        // check user and password (credentials.password - from frontend; user.password - from DB )
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            email: user.email,
            role: user.role,
          };
        }

        throw new Error('Invalid email or password!');
      },
    }),
  ],
});
