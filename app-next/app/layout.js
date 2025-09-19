import "./globals.css";
import Header from "../components/Header/Header";

import { Providers } from "./provider/provider";

import Footer from "../components/Footer/Footer";


export const metadata = {
  title: "CareConnect",
  description: "CareConnect App",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Providers>
         

        <Header />
        <main>{children}</main>
        <Footer />

      </body>
    </html>
  );
}
