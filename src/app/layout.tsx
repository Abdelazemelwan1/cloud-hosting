import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from './_componant/header/Header';
import Footer from "./_componant/Footer/Footer";
import ClientProvider from "./_componant/ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Cloud Hosting",
//   description: "cloud hosting project",
// };

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Provider store={store}> */}
          <Header />
          {/* <ToastContainer theme="colored" position="top-center"/> */}
          <ClientProvider>

          <main>
            {children}
          </main>
          </ClientProvider>
          <Footer />
        {/* </Provider> */}
      </body>
    </html>
  );
}
