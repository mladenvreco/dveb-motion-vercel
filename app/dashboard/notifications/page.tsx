"use client";
import React, { useState, useEffect } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { mockNotifications } from "@/data/data";

interface Notification {
  id: number;
  type: "training" | "community" | "billing" | "system";
  message: string;
  read: boolean;
}

export default function NotificationsPage() {
  const { isLoggedIn } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<"all" | "training" | "system">("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const mockData: Notification[] = mockNotifications as Notification[];

        await new Promise((res) => setTimeout(res, 500));
        setNotifications(mockData);
      } catch {
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, []);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((notification) => notification.type === filter);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const snoozeNotification = (id: number) => {
    alert(`Notification #${id} snoozed for 1 hour.`);
  };

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
        <h1 className={classes.title}>Notifications & Reminders</h1>
        <p className={classes.subtitle}>
          Stay up to date with trainings, community, and system updates.
        </p>
      </header>

      <div className={classes.filterBar}>
        <button
          className={filter === "all" ? classes.active : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "training" ? classes.active : ""}
          onClick={() => setFilter("training")}
        >
          Training
        </button>
        <button
          className={filter === "system" ? classes.active : ""}
          onClick={() => setFilter("system")}
        >
          System
        </button>
      </div>

      <section className={classes.list}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`${classes.notification} ${
                notification.read ? classes.read : ""
              }`}
            >
              <div className={classes.info}>
                <span className={classes.type}>{notification.type}</span>
                <p>{notification.message}</p>
              </div>
              <div className={classes.actions}>
                {!notification.read && (
                  <button onClick={() => markAsRead(notification.id)}>
                    ✓ Read
                  </button>
                )}
                <button onClick={() => snoozeNotification(notification.id)}>
                  Snooze
                </button>
                <button onClick={() => deleteNotification(notification.id)}>
                  ✕ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={classes.empty}>No new notifications.</p>
        )}
      </section>

      <footer className={classes.footer}>
        <a href="/dashboard" className={classes.link}>
          ← Back to Dashboard
        </a>
      </footer>
    </div>
  );
}
