import type { Metadata } from "next";
import { Catamaran, Open_Sans } from "next/font/google";
// import { Raleway } from 'next/font/google'
// import { Aguafina_Script } from 'next/font/google'
// import localFont from 'next/font/local'
import "./globals.css";
import "./responsive.css";
import 'bootstrap/dist/css/bootstrap.css'
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Provider } from "@/context/client-provider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Head from "next/head";
import Analytics from "@/components/Analytics/Analytics";

const lato = Open_Sans({
  variable: "--lato",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
})
// const catamaran = Catamaran({
//   variable: "--catamaran",
//   weight: ['400', '500', '600', '700'],
//   subsets: ["latin"],
// })

// const playfair = Raleway({
//   variable: "--playfair",
//   weight: ['400', '500', '600', '700'],
//   subsets: ["latin"],
// });

// const script = Aguafina_Script({
//   variable: "--script",
//   weight: ['400'],
//   subsets: ["latin"],
// });

// const athelas = localFont({
//   src: './Athelas/Athelas-Regular.ttf',
//   variable: '--lato',
// })

export const metadata: Metadata = {
  title: "Wabi Sabi Stay",
  description: "Wabi Sabi Stays is a room provider in Hotels and Appartments locations like Dehradun,Mussorie,Rishikesh",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`${lato.variable}`}>
   <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="https://wabisabistays.com/wabisabi.webp" />
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossOrigin="anonymous"></script>

      <Analytics />

      </head>

   
      <body> 
          <Toaster
          containerStyle={{
            zIndex:"999999999999999999"
          }}
         
          toastOptions={{
            className: '',
            style: {
              width: 'auto',
              height: 'auto',
              fontSize: '15px',
              fontWeight: '500',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              border: '1px solid rgba(179, 179, 179, 0.3215686275)',
              borderRadius: '0px',
              color: '#516b6a',
              zIndex:"9999999",
             
              
            },
            position: "top-center",

            iconTheme: {
              primary: '#516b6a',
              secondary: '#fff',
            },

            success: {
              style: {
                color: '#516b6a',
                borderLeft: '4px solid #516b6a',
              },
            },
            error: {
              style: {
                color: '#516b6a',
                borderLeft: '4px solid #516b6a',
              },
            },
          }}
          /> <Provider session={session}>{children}</Provider></body>
    </html>
  );
}
