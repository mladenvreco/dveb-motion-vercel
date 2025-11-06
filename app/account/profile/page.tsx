"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import classes from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      const parsed = JSON.parse(session);
      setUser(parsed);
      setAvatar(parsed.avatar || null);
    }
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: value }));
  }

  //set avatar
  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result as string);
        setUser((prev: any) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    try {
      if (!user) return;

      if (currentPassword && currentPassword !== user?.password) {
        setMessage("Wrong current password");
        return;
      }

      const updatedUser = { ...user };
      if (newPassword.trim()) {
        updatedUser.password = newPassword;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? updatedUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("session", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setMessage("Changes saved successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      setMessage("Error occurred, try again later");
    }
  }

  function handleCancel() {
    router.push("/dashboard");
  }

  if (!isLoggedIn) {
    return (
      <>
        <p>Log in to see profile page.</p>
        <button>
          <Link href={"/auth/login"}>Login</Link>
        </button>
      </>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Profile Settings</h1>
      <p className={classes.subtitle}>
        Manage your personal information and account details.
      </p>

      {message && <p className={classes.message}>{message}</p>}

      {/* Avatar upload */}
      <section className={classes.section}>
        <h2>Profile Picture</h2>
        <div className={classes.imageUpload}>
          {avatar ? (
            <Image
              src={avatar}
              alt="Avatar"
              className={classes.avatar}
              width={80}
              height={80}
            />
          ) : (
            <div className={classes.avatarPlaceholder}>No image</div>
          )}
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.grid}>
          <div className={classes.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={user?.firstName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user?.lastName || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={classes.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            onChange={handleInputChange}
          />
        </div>

        <div className={classes.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={user?.phone || ""}
            onChange={handleInputChange}
          />
        </div>
      </section>

      <section className={classes.section}>
        <label>Short Bio</label>
        <textarea
          name="bio"
          value={user?.bio || ""}
          onChange={handleInputChange}
          className={classes.textarea}
          rows={3}
        ></textarea>
      </section>

      <section className={classes.section}>
        <h2>Change Password</h2>
        <div className={classes.formGroup}>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className={classes.formGroup}>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </section>

      <div className={classes.actions}>
        <button onClick={handleCancel} className={classes.cancelBtn}>
          Cancel
        </button>
        <button onClick={handleSave} className={classes.primaryBtn}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
