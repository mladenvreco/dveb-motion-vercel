"use client";

import React, { useState } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { mockDevices } from "@/data/data";

export default function DevicesPage() {
  const { isLoggedIn } = useAuth();
  const [devices, setDevices] = useState(mockDevices);

  const handleDisconnect = (id: number) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, connected: false } : device
      )
    );
  };

  const handleConnectNew = () => {
    alert("Connect new device functionality coming soon!");
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
      <h1 className={classes.title}>Connected Devices</h1>
      <p className={classes.subtitle}>
        Manage and monitor your connected fitness devices and platforms.
      </p>

      <div className={classes.devicesGrid}>
        {devices.map((device) => (
          <div
            key={device.id}
            className={`${classes.deviceCard} ${
              device.connected ? classes.connected : classes.disconnected
            }`}
          >
            <div className={classes.deviceHeader}>
              <h2 className={classes.deviceName}>{device.name}</h2>
              <span
                className={`${classes.status} ${
                  device.connected ? classes.connected : classes.disconnected
                }`}
              >
                {device.connected ? "Connected" : "Disconnected"}
              </span>
            </div>

            <p className={classes.deviceInfo}>{device.info}</p>
            <p className={classes.syncText}>
              Last sync: <strong>{device.lastSync}</strong>
            </p>

            <div className={classes.actions}>
              {device.connected ? (
                <button
                  className={classes.disconnectBtn}
                  onClick={() => handleDisconnect(device.id)}
                >
                  Disconnect
                </button>
              ) : (
                <button className={classes.reconnectBtn}>Reconnect</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={classes.cta}>
        <button className={classes.connectBtn} onClick={handleConnectNew}>
          Connect New Device
        </button>
      </div>
    </div>
  );
}
