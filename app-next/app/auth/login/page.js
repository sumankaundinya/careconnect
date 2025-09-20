"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/commonStyles.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const initialLoginFormdata = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formData, setFormData] = useState(initialLoginFormdata);
  const router = useRouter();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const loginResponse = await res.json();
      const { accessToken, user } = loginResponse;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      useAuthStore.setState({ token: accessToken, user });

      if (user.role === "ADMIN") router.push("/admin");
      else if (user.role === "VOLUNTEER") router.push("/my-profile");
      else router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            required
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.helper}>
          Don&apos;t have an account{" "}
          <Link href="/auth/register" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
