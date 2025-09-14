"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/provider/authSlice";
const navItems = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Request Help",
    to: "/request-help",
  },
  {
    title: "Offer Help",
    to: "/offer-help",
  },
  {
    title: "About",
    to: "/About",
  },
  {
    title: "Services",
    to: "/Services",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const toggleMenu = () => {
    setShowMobileMenu((prev) => !prev);
  };
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();

      router.push("/");
    } catch (error) {
      alert(error || "logout Error");
    }
  };
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} `}>
      <div className={styles.topHeader}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/logo.png"
              alt="CareConnect Logo"
              width={40}
              height={40}
            />
            <span>CareConnect</span>
          </Link>
        </div>
        <div className={styles.menu}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <Menu />
          </button>
        </div>
      </div>

      <nav
        id="primary-nav"
        className={showMobileMenu ? styles.showMenu : styles.hideMenu}
        aria-hidden={!showMobileMenu}
      >
        <ul className={styles.navList}>
          {navItems &&
            navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.to}>{item.title}</Link>
              </li>
            ))}
          {user ? (
            <>
              <li>
                {" "}
                <Link href={"account"}>My Account</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.menuButton}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
