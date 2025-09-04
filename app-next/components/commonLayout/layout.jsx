"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Header from "../Header/Header";
const pathsNotToShowHeaders = ["/auth", "/admin"];
export default function CommonLayout({ children }) {
  const pathName = usePathname();
  const showHeader = !pathsNotToShowHeaders.some((path) =>
    pathName.startsWith(path)
  );
  return (
    <div>
      {showHeader && <Header />}
      <main>{children}</main>
    </div>
  );
}
