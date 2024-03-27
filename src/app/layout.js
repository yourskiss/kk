// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import "./globals.css";


export const metadata = {
  title: "kerakoll app",
  description: "kerakoll app",
  manifest:'./manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta name="background_color" content="#AFCDAF"/>
      <meta name="theme-color" content="#414141"/>
      {/* <body className={inter.className}> */}
      <body>
        <main className="main">
          {children}
        </main>

        <Script src="/service-worker.js" />
      </body>
    </html>
  );
}
