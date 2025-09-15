import "./globals.css";
import Header from "../components/Header/Header";
import { Providers } from "./provider/provider";

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

          {children}
        </Providers>
      </body>
    </html>
  );
}
