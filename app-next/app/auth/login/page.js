"use client";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/commonStyles.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/provider/authSlice";

export const initialLoginFormdata = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [formData, setFormData] = useState(initialLoginFormdata);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((s) => s.auth);
  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(
        login({ email: formData.email, password: formData.password })
      ).unwrap();
      console.log(user);
      if (user?.role === "ADMIN") {
        router.push("/admin");
      } else if (user?.role === "VOLUNTEER") {
        router.push("/services");
      } else {
        router.push("/");
      }
    } catch (error) {
      alert(error || "login Error");
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
        {error && <p className={styles.red}>{error}</p>}
        <button type="submit" className={styles.button}>
          {isLoading ? " Login in.." : "Login"}
        </button>

        <p className={styles.helper}>
          Forgot Password{" "}
          <Link href="/auth/forgot-password" className={styles.link}>
            Reset Password
          </Link>
        </p>

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
