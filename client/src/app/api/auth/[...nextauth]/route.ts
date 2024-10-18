import { loginApi, otpLoginApi } from "@/service/user.service"
import NextAuth from "next-auth"
import type {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
const GOOGLE_ID = "";
const  GOOGLE_SECRET=""
 export const authOptions: AuthOptions = {
   providers: [
     CredentialsProvider({
       name: "Credentials",
       credentials: {
         phone: { label: "Phone", type: "text" },
         name: { label: "Name", type: "text" },
         email: { label: "Email", type: "text" },
         otp: { label: "Otp", type: "text" },
       },
       async authorize(credentials, req) {
         let res: any;

         const payload = {
           phone: credentials?.phone,
           otp: credentials?.otp,
           name: credentials?.name,
           email: credentials?.email,
         };
         res = await otpLoginApi(payload);
         try {
           if (res.data.token) {
             const user = {
               ...res.data.user,
               accessToken: res.data.token,
               refreshToken: res.data.refreshToken,
             };
             console.log(user, "Token Respone");

             if (user) {
               return user;
             } else {
               return null;
             }
           }
         } catch (error: any) {
           console.log(error, "errorerrorerror");

           errorMessage(error);
         }
         return null;
       },
     }),
     GoogleProvider({
       clientId: process.env.GOOGLE_ID ?? GOOGLE_ID,
       clientSecret: process.env.GOOGLE_SECRET ?? GOOGLE_SECRET,
     }),
   ],
   session: {
     strategy: "jwt",
   },
   // secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
     async jwt({ token, trigger, user, session }) {
       if (trigger === "update" && session) {
         return { ...token, ...session?.user };
       }
       return { ...token, ...user };
     },
     async session({ session, token, user }) {
       // Send properties to the client, like an access_token from a provider.
       session.user = token as any;
       return session;
     },
   },

 };

const handler = NextAuth(authOptions);

 const errorMessage = (err:any) => {

  if (err?.response?.data?.message){
         throw new Error(err?.response?.data?.message);
  }
  else if (err.message)
         throw new Error(err.message);
  else if (typeof err == 'string')
         throw new Error(err);
  else
         throw new Error('Error');
}

export {handler as GET ,handler as POST};