"use client";

import { useEffect, useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { mockDevices, mockNotifications, mockProgress } from "@/data/data";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { isLoggedIn } = useAuth();

  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [filter, setFilter] = useState<
    "all" | "training" | "system" | "billing" | "community"
  >("all");
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const mockData = mockProgress;

    setData(mockData?.[period] ?? []);
  }, [period]);

  const filteredNotifications =
    filter === "all"
      ? mockNotifications
      : mockNotifications.filter(
          (notification) => notification.type === filter
        );

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
      <h1 className={classes.title}>Main Hub Dashboard</h1>
      <p className={classes.subtitle}>
        Central overview: progress, reminders, and connected devices.
      </p>

      <section className={classes.card}>
        <div className={classes.sectionHeader}>
          <h2>Progress Overview</h2>
          <div className={classes.toggleGroup}>
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
        </div>

        <div className={classes.chart}>
          {data.length > 0 ? (
            <div className={classes.barContainer}>
              {(() => {
                const max = Math.max(...data);
                const denom = max > 0 ? max : 1;
                return data.map((value, i) => (
                  <div
                    key={i}
                    className={classes.bar}
                    style={{ height: `${(value / denom) * 100}%` }}
                    title={`${value} steps`}
                  />
                ));
              })()}
            </div>
          ) : (
            <p className={classes.placeholder}>Data currently unavailable...</p>
          )}
        </div>
        <br />
        <Link href="/dashboard/progress-overview">View detailed</Link>
      </section>

      <section className={classes.card}>
        <div className={classes.sectionHeader}>
          <h2>Notifications & Reminders</h2>
          <div className={classes.filterGroup}>
            <button
              onClick={() => setFilter("all")}
              className={filter === "all" ? classes.activeBtn : ""}
            >
              All
            </button>
            <button
              onClick={() => setFilter("training")}
              className={filter === "training" ? classes.activeBtn : ""}
            >
              Training
            </button>
            <button
              onClick={() => setFilter("billing")}
              className={filter === "billing" ? classes.activeBtn : ""}
            >
              Billing
            </button>
            <button
              onClick={() => setFilter("community")}
              className={filter === "community" ? classes.activeBtn : ""}
            >
              Community
            </button>
            <button
              onClick={() => setFilter("system")}
              className={filter === "system" ? classes.activeBtn : ""}
            >
              System
            </button>
          </div>
        </div>

        <ul className={classes.notificationList}>
          {filteredNotifications.length ? (
            filteredNotifications.map((notification) => (
              <li key={notification.id}>
                {notification.message}
                <div className={classes.actions}>
                  <button>✓</button>
                  <button>✕</button>
                </div>
              </li>
            ))
          ) : (
            <p className={classes.empty}>No notifications found.</p>
          )}
        </ul>
        <br />
        <Link href="/dashboard/notifications">View detailed</Link>
      </section>

      <section className={classes.card}>
        <h2>Connected Devices</h2>
        <ul className={classes.deviceList}>
          {mockDevices.map((device) => (
            <li key={device.name}>
              <span>{device.name}</span>
              <span
                className={
                  device.connected ? classes.connected : classes.disconnected
                }
              >
                {device.connected ? "Connected" : "Disconnected"}
              </span>
            </li>
          ))}
        </ul>
        <br />
        <Link href={"/dashboard/devices"}>
          <button className={classes.manageBtn}>Manage</button>
        </Link>
      </section>

      <section className={classes.card}>
        <h2>User Settings</h2>
        <div className={classes.settingsGrid}>
          <div>
            <label>Language:</label>
            <select>
              <option>EN</option>
              <option>RS</option>
              <option>DE</option>
            </select>
          </div>

          <div className={classes.backupBtns}>
            <label>Backup:</label>
            <div>
              <button>Export</button>
              <button>Restore</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
