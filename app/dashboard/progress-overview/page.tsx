"use client";
import React, { useState, useEffect } from "react";
import classes from "./page.module.css";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { mockProgress } from "@/data/data";

export default function ProgressOverview() {
  const { isLoggedIn } = useAuth();
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const mockData = mockProgress;

    setData(mockData[period]);
  }, [period]);

  if (!isLoggedIn) {
    return (
      <>
        <p>Log in to see dashboard.</p>
        <button>
          <Link href={"/auth/login"}>Login</Link>
        </button>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>Progress Overview</h1>
        <p className={classes.subtitle}>
          Get a quick view of your physical and health progress
        </p>
      </header>

      <section className={classes.metrics}>
        <div className={classes.card}>
          <h3>Steps</h3>
          <p>52,340</p>
          <span>+8% compared to last week</span>
        </div>
        <div className={classes.card}>
          <h3>Calories</h3>
          <p>3,850 kcal</p>
          <span>+5% compared to last week</span>
        </div>
        <div className={classes.card}>
          <h3>Workouts</h3>
          <p>5 sessions</p>
          <span>✔ goal achieved</span>
        </div>
      </section>

      <section className={classes.chartSection}>
        <div className={classes.chartHeader}>
          <h2>Activity Statistics</h2>
          <div className={classes.toggle}>
            <button
              className={period === "daily" ? classes.active : ""}
              onClick={() => setPeriod("daily")}
            >
              Daily
            </button>
            <button
              className={period === "weekly" ? classes.active : ""}
              onClick={() => setPeriod("weekly")}
            >
              Weekly
            </button>
            <button
              className={period === "monthly" ? classes.active : ""}
              onClick={() => setPeriod("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className={classes.chart}>
          {data.length > 0 ? (
            <div className={classes.barContainer}>
              {data.map((value, i) => (
                <div
                  key={i}
                  className={classes.bar}
                  style={{ height: `${(value / Math.max(...data)) * 100}%` }}
                  title={`${value} steps`}
                />
              ))}
            </div>
          ) : (
            <p className={classes.placeholder}>Data currently unavailable...</p>
          )}
        </div>

        <Link href="/dashboard/analytics" className={classes.link}>
          → View detailed analytics
        </Link>
      </section>
    </div>
  );
}
