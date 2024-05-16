import { dbConnect } from "../../../../backend/config/dbConnect";
import User, { IUser } from "../../../../backend/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import crypto from "crypto";

type Token = {
  user: IUser;
};

async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
      maxAge: 1 * 60 * 60, // 1 hour
      updateAge: 24 * 60 * 60, // 24 hours
    },
    cookies: {
      sessionToken: {
        name: `__Secure-next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        },
      },
    },
    providers: [
      // @ts-ignore
      CredentialsProvider({
        async authorize(credentials) {
          await dbConnect();

          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error("Invalid email or password");
          }

          return user;
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        async profile(profile) {
          await dbConnect();

          let user = await User.findOne({ email: profile.email });

          if (!user) {
            const randomPassword = crypto.randomBytes(16).toString("hex"); // Generate a random password
            user = await User.create({
              name: profile.name,
              email: profile.email,
              password: bcrypt.hashSync(randomPassword, 10), // Hash the random password
              googleId: profile.sub,
            });
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        const jwtToken = token as Token;

        if (user) {
          jwtToken.user = user as IUser;
        }

        // Update session when user is updated
        if (req.url?.includes("/api/auth/session?update")) {
          // Hit the database and return the updated user
          const updatedUser = await User.findById(jwtToken?.user?._id);
          jwtToken.user = updatedUser;
        }
        return jwtToken;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        // @ts-ignore
        delete session?.user?.password;

        return session;
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}

export { auth as GET, auth as POST };
