"use client";

import { useState } from "react";
import classes from "./page.module.css";

type Settings = any;

export default function SettingsForm({
  settings,
  onSave,
}: {
  settings: Settings;
  onSave: (s: Settings) => void;
}) {
  const [local, setLocal] = useState<Settings>(settings);
  const [loadingIntegration, setLoadingIntegration] = useState<
    Record<string, boolean>
  >({});

  const update = (patch: Partial<Settings>) => {
    setLocal((prev: Settings) => ({ ...prev, ...patch }));
  };

  const updateNotificationsCategory = (
    category: string,
    channel: "push" | "email",
    value: boolean
  ) => {
    setLocal((prev: Settings) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [category]: {
          ...prev.notifications?.[category],
          [channel]: value,
        },
      },
    }));
  };

  const handleCancel = () => {
    setLocal(settings);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(local);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Preferences</h2>
        <div className={classes.grid}>
          <div className={classes.field}>
            <label>Language</label>
            <select
              value={local.language}
              onChange={(e) => update({ language: e.target.value })}
            >
              <option value="en">English</option>
              <option value="sr">Srpski</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className={classes.field}>
            <label>Theme</label>
            <select
              value={local.theme}
              onChange={(e) => update({ theme: e.target.value })}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Notifications</h2>

        <div className={classes.checkboxRow}>
          <label className={classes.checkboxLabel}>
            <input
              type="checkbox"
              checked={!!local.pushNotifications}
              onChange={(e) => update({ pushNotifications: e.target.checked })}
            />
            Enable Push Notifications
          </label>

          <label className={classes.checkboxLabel}>
            <input
              type="checkbox"
              checked={!!local.emailNotifications}
              onChange={(e) => update({ emailNotifications: e.target.checked })}
            />
            Receive Email Updates
          </label>
        </div>

        <div className={classes.notificationGrid} role="table">
          <div className={classes.notificationHeader} role="row">
            <div role="columnheader">Category</div>
            <div role="columnheader">Push</div>
            <div role="columnheader">Email</div>
          </div>

          {["trainings", "community", "billing"].map((cat) => {
            const label =
              cat === "trainings"
                ? "Trainings"
                : cat === "community"
                ? "Community"
                : "Billing";
            return (
              <div className={classes.notificationRow} key={cat} role="row">
                <div role="cell" className={classes.notificationCategory}>
                  {label}
                </div>
                <div role="cell">
                  <input
                    type="checkbox"
                    checked={!!local.notifications?.[cat]?.push}
                    onChange={(e) =>
                      updateNotificationsCategory(cat, "push", e.target.checked)
                    }
                  />
                </div>
                <div role="cell">
                  <input
                    type="checkbox"
                    checked={!!local.notifications?.[cat]?.email}
                    onChange={(e) =>
                      updateNotificationsCategory(
                        cat,
                        "email",
                        e.target.checked
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Integrations</h2>

        <div className={classes.integrations}>
          {[
            { key: "spotify", label: "Spotify" },
            { key: "appleHealth", label: "Apple Health" },
            { key: "googleFit", label: "Google Fit" },
          ].map((svc) => {
            const connected = !!local.integrations?.[svc.key];
            return (
              <div className={classes.integrationCard} key={svc.key}>
                <div className={classes.integrationInfo}>
                  <div className={classes.integrationLabel}>{svc.label}</div>
                  <div className={classes.integrationStatus}>
                    {connected ? "Connected" : "Disconnected"}
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={
                      connected ? classes.disconnectBtn : classes.connectBtn
                    }
                    disabled={!!loadingIntegration[svc.key]}
                  >
                    Connect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={classes.section}>
        <h2 className={classes.sectionTitle}>Privacy</h2>
        <div className={classes.radioGroup}>
          {["public", "private", "friends"].map((opt) => (
            <label key={opt} className={classes.radioLabel}>
              <input
                type="radio"
                name="privacy"
                checked={local.privacy === opt}
                onChange={() => update({ privacy: opt })}
              />
              {opt === "public"
                ? "Public Profile"
                : opt === "private"
                ? "Private Profile"
                : "Friends Only"}
            </label>
          ))}
        </div>
      </section>

      <div className={classes.actions}>
        <button type="button" onClick={handleCancel} className={classes.cancel}>
          Cancel
        </button>
        <button type="submit" className={classes.save}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
