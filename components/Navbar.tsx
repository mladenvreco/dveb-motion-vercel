"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import classes from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  function handleLoginBtn() {
    router.push("/auth/login");
  }

  return (
    <nav className={classes.nav}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/about">About</Link>
      <Link href="/account/profile">Profile</Link>
      <Link href="/account/settings">Settings</Link>

      {isLoggedIn ? (
        <button onClick={logout}>logout</button>
      ) : (
        <button onClick={handleLoginBtn}>login</button>
      )}
    </nav>
  );
}
