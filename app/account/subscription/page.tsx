"use client";

import React, { useEffect, useState } from "react";
import classes from "./page.module.css";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function SubscriptionPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const session = localStorage.getItem("session");

    if (session) {
      setCurrentUser(JSON.parse(session));
    }
  }, []);

  if (!currentUser) return <p className={classes.loading}>Loading...</p>;

  function formatDate(unFormatedDate: string) {
    const date = new Date(unFormatedDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  if (!isLoggedIn) {
    return (
      <>
        <p>Log in to see subscription page.</p>
        <button>
          <Link href={"/auth/login"}>Login</Link>
        </button>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Subscription</h1>
      <p className={classes.subtitle}>
        Manage your current plan and billing preferences.
      </p>

      <section className={classes.section}>
        <h2>Current Plan</h2>
        <div className={classes.currentPlan}>
          <p>
            <strong>Current Plan:</strong> {currentUser.plan || "Free"}
          </p>
          <p>
            Started:{" "}
            {currentUser.createdAt ? formatDate(currentUser.createdAt) : "/"}
          </p>
          {currentUser.plan === "Premium" ? (
            <button className={classes.cancelBtn}>Cancel Subscription</button>
          ) : (
            <Link href={"/account/subscription/checkout"}>
              <button className={classes.upgradeBtn}>Upgrade to Premium</button>
            </Link>
          )}
        </div>
      </section>

      <section className={classes.section}>
        <h2>Available Plans</h2>
        <div className={classes.plansGrid}>
          <div className={classes.planCard}>
            <h3>Free Plan</h3>
            <p className={classes.price}>$0 / month</p>
            <ul>
              <li>Basic tracking</li>
              <li>Community access</li>
            </ul>
            <button className={classes.selectBtn}>Select</button>
          </div>

          <div className={classes.planCard}>
            <h3>Basic Plan</h3>
            <p className={classes.price}>$9 / month</p>
            <ul>
              <li>Workouts & nutrition</li>
              <li>Sync devices</li>
            </ul>
            <button className={classes.selectBtn}>Select</button>
          </div>

          <div
            className={`${classes.planCard} ${
              currentUser.plan === "premium" ? classes.activePlan : ""
            }`}
          >
            <h3>Pro Plan</h3>
            <p className={classes.price}>$19 / month</p>
            <ul>
              <li>Advanced analytics</li>
              <li>Premium support</li>
            </ul>
            <button className={classes.selectBtn}>
              {currentUser.plan === "premium" ? "Active" : "Select"}
            </button>
          </div>
        </div>

        <div className={classes.saveWrapper}>
          <button className={classes.saveBtn}>Save Changes</button>
        </div>
      </section>

      <section className={classes.section}>
        <h2>Billing History</h2>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01/09/2025</td>
              <td>Pro</td>
              <td>$19</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>01/08/2025</td>
              <td>Pro</td>
              <td>$19</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
