import "./globals.css";
import Header from "../components/Header/Header";
import CommonLayout from "@/components/commonLayout/layout";

export const metadata = {
  title: "CareConnect",
  description: "CareConnect App",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
