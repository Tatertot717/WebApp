// webapp/src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectMongoDB from "@/src/config/mongodb";
import User from "@/src/models/userSchema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login?tab=signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };