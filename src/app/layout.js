// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"  />
          {children}
        </main>

        <Script src="/service-worker.js" />
      </body>
    </html>
  );
}
