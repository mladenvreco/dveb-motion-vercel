"use client";

import { useState, useEffect } from "react";
import SettingsForm from "./SettingsForm";
import { useTheme } from "@/app/context/ThemeContext";
import type { Theme } from "@/app/context/ThemeContext";
import classes from "./page.module.css";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

const DEFAULT_SETTINGS = {
  language: "en",
  theme: "Light",
  pushNotifications: true,
  emailNotifications: false,
  notifications: {
    trainings: { push: true, email: false },
    community: { push: true, email: false },
    billing: { push: false, email: true },
  },
  integrations: {
    spotify: false,
    appleHealth: false,
    googleFit: false,
  },
  privacy: "public",
};

export default function SettingsPage() {
  const { isLoggedIn } = useAuth();
  const [settings, setSettings] = useState<any>(DEFAULT_SETTINGS);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        if (parsed.theme) {
          setTheme(parsed.theme);
        }
      } catch {
        setSettings(DEFAULT_SETTINGS);
        setTheme(DEFAULT_SETTINGS.theme as Theme);
      }
    } else {
      setTheme(DEFAULT_SETTINGS.theme as Theme);
    }
  }, [setTheme]);

  const handleSave = (newSettings: any) => {
    setSettings(newSettings);
    localStorage.setItem("userSettings", JSON.stringify(newSettings));

    if (newSettings.theme) {
      setTheme(newSettings.theme);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <p>Log in to see settings.</p>
        <button>
          <Link href={"/auth/login"}>Login</Link>
        </button>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Account Settings</h1>
      <p className={classes.subtitle}>
        Manage preferences, notifications, integrations and privacy options.
      </p>

      <SettingsForm settings={settings} onSave={handleSave} />
    </div>
  );
}
