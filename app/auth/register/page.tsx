"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import Title from "@/components/Title";
import { useAuth } from "@/app/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [plan, setPlan] = useState("");

  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");

  const [error, setError] = useState("");

  const emailIsValid = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return setError("Please fill in all fields.");
    if (!emailIsValid(email))
      return setError("Please enter a valid email address.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    setError("");
    setStep(2);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal || !experience)
      return setError("Please select your goal and experience level.");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: any) => u.email === email.toLowerCase())) {
      return setError("User already exists. Try logging in.");
    }

    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      goal,
      experience,
      plan,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem(
      "session",
      JSON.stringify({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        plan: newUser.plan,
        token: "mock-token",
        createdAt: newUser.createdAt,
      })
    );
    localStorage.setItem("isLoggedIn", "true");

    login();
    router.push("/dashboard");
  };

  return (
    <main className={classes.wrapper}>
      <Title>Create your DVeb Motion™ Account</Title>
      <p className={classes.subtitle}>
        Sign up and start your fitness journey today.
      </p>

      <div className={classes.card}>
        {error && <p className={classes.error}>{error}</p>}

        {step === 1 && (
          <form onSubmit={handleNext} className={classes.form}>
            <h2>Step 1: Basic Info</h2>

            <label>
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>

            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <div className={classes.actions}>
              <button type="submit" className={classes.nextBtn}>
                Next
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className={classes.form}>
            <h2>Step 2: Onboarding Info</h2>

            <label>
              Select your main goal
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
              </select>
            </label>

            <label>
              Select your experience level
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <label>Select plan</label>

            <div>
              <label htmlFor="1">Free </label>
              <input
                type="radio"
                id="1"
                name="plan"
                value="Free"
                checked={plan === "Free"}
                onChange={(e) => setPlan(e.target.value)}
              />
              <br />
              <label htmlFor="2">Premium </label>
              <input
                type="radio"
                id="2"
                name="plan"
                value="Premium"
                checked={plan === "Premium"}
                onChange={(e) => setPlan(e.target.value)}
              />
            </div>

            <div className={classes.actions}>
              <button
                type="button"
                className={classes.backBtn}
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        )}
      </div>

      <footer>
        Already have an account?{" "}
        <Link href="/auth/login" className={classes.link}>
          Sign In
        </Link>
      </footer>
    </main>
  );
}
