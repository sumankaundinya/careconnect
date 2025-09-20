"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore"; // ← Import Zustand store

const navItems = [
  { title: "Home", to: "/" },
  { title: "Volunteers", to: "/volunteers" },
  { title: "About", to: "/About" },
  { title: "Services", to: "/services" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Get user and logout function from Zustand
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setShowMobileMenu((prev) => !prev);

  const handleLogout = async () => {
    logout(); // Zustand logout function
    router.push("/");
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
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
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.to}>{item.title}</Link>
            </li>
          ))}

          {user?.role === "VOLUNTEER" && (
            <li>
              <Link href="/my-profile">My Profile</Link>
            </li>
          )}

          {user ? (
            <li>
              <button onClick={handleLogout} className={styles.menuButton}>
                Logout
              </button>
            </li>
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
