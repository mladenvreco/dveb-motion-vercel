"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import classes from "./page.module.css";
import Title from "@/components/Title";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      setError("Account doesn't exist. Please register.");
      return;
    }

    const users = JSON.parse(storedUsers);

    const foundUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (foundUser) {
      if (remember) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      localStorage.setItem("session", JSON.stringify(foundUser));
      localStorage.setItem("isLoggedIn", "true");

      login();
      router.push("/dashboard");
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <>
      <Title>Login to DVeb Motion™</Title>

      <div className={classes.loginWrapper}>
        <div className={classes.loginCard}>
          {error && <p className={classes.error}>{error}</p>}

          <form onSubmit={handleLogin} className={classes.form}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={classes.input}
            />
            <label htmlFor="email">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={classes.input}
            />

            <div className={classes.options}>
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                Remember Me
              </label>
              <Link href="/auth/reset-password" className={classes.forgot}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className={classes.loginBtn}>
              Login
            </button>
          </form>

          <p className={classes.registerText}>
            Don’t have an account?{" "}
            <Link href="/auth/register" className={classes.registerLink}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
