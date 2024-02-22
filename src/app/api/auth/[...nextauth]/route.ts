import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';


const prisma = globalThis.prisma || new PrismaClient();
const AUTH_URL = process.env.AUTH_URL || "";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(AUTH_URL, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()
        // If no error and we have user data, return it
       
        if (user && user.data) {
          try {
            let dbUser = await prisma.user.findFirst({ where: { email: user.data.email} });
            //If the user does not exist, create it
            if (!dbUser) {
              dbUser = await prisma.user.create({ 
                data: { 
                  email: user.data.email, 
                  name: `${user.data.first_name} ${user.data.last_name}`,
                  role: String(user.data.role),
                  adminId: String(user.data.id),
              } });
            }
          } catch (error) {
            console.log({error})
          }
          
          return { email: user.data.email, name: `${user.data.first_name} ${user.data.last_name}`, id: user.data.id }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
});

export { handler as GET, handler as POST };