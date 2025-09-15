"use client";

import { AddressProvider } from "@/context/addressContext";
import { AuthProvider } from "@/context/authContext";

export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <AddressProvider>{children}</AddressProvider>
    </AuthProvider>
  );
};
