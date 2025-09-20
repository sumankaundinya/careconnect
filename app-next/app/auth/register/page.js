"use client";

import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/commonStyles.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const initialRegisterFormData = {
  email: "",
  password: "",
  name: "",
  role: "VOLUNTEER",
};

export default function RegisterPage() {
  const [formData, setFormData] = useState(initialRegisterFormData);
  const { register, error, isLoading, setError } = useAuthStore(); // zustand store
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(
        formData.email,
        formData.name,
        formData.password,
        formData.role
      );
      router.push("/auth/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleRegister} className={styles.form}>
        {/* form fields here */}
      </form>
    </AuthLayout>
  );
}
