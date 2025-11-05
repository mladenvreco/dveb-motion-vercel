"use client";

import React, { useState } from "react";
import Head from "next/head";
import classes from "./gdpr.module.css";
import Title from "@/components/Title";

export default function GDPRPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<
    "access" | "rectify" | "delete" | "portability" | "object"
  >("access");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const DPO = {
    name: "Mladen Vrećo",
    email: "mladen@vreco.com",
    phone: "+387123456",
  };

  function validateEmail(em: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  }

  async function submitRequest(e?: React.FormEvent) {
    e?.preventDefault();
    setStatus(null);

    if (!name.trim() || !email.trim()) {
      setStatus({ type: "error", text: "Please provide your name and email." });
      return;
    }
    if (!validateEmail(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      const req = {
        id: Date.now(),
        name,
        email,
        requestType,
        message,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(
        localStorage.getItem("gdpr_requests") || "[]"
      );
      existing.push(req);
      localStorage.setItem("gdpr_requests", JSON.stringify(existing));

      setStatus({
        type: "success",
        text: "Your request has been submitted. We will respond within 30 days.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setRequestType("access");
    } catch (err) {
      setStatus({
        type: "error",
        text:
          "We couldn't submit the request automatically. Please email your request to " +
          DPO.email +
          " with subject 'GDPR request' and include your name, email and requested action.",
      });
    } finally {
    }
  }

  return (
    <>
      <Title>GDPR & Data Protection</Title>
      <main className={classes.page} role="main">
        <header className={classes.header}>
          <p className={classes.lead}>
            DVeb Motion™ is committed to protecting your personal data and
            giving you control over it. Below you ’ll find how we collect, use
            and share data, and how you can exercise your rights.
          </p>
        </header>

        <section
          className={classes.section}
          aria-labelledby="principles-heading"
          role="region"
        >
          <h2 id="principles-heading" className={classes.sectionTitle}>
            GDPR Principles
          </h2>
          <ul className={classes.bullets}>
            <li>
              <strong>Transparency:</strong> We clearly document what we collect
              and why.
            </li>
            <li>
              <strong>Data minimization:</strong> We only collect what is
              necessary for the service.
            </li>
            <li>
              <strong>Purpose limitation:</strong> Data is used only for the
              purpose stated at collection.
            </li>
            <li>
              <strong>Limited retention:</strong> We keep personal data only as
              long as needed.
            </li>
          </ul>
        </section>

        <section
          className={classes.section}
          aria-labelledby="rights-heading"
          role="region"
        >
          <h2 id="rights-heading" className={classes.sectionTitle}>
            Your Rights
          </h2>
          <div className={classes.grid}>
            <article className={classes.card} aria-labelledby="access">
              <h3 id="access">Right of Access</h3>
              <p>
                You can request a copy of the personal data we hold about you.
              </p>
            </article>

            <article className={classes.card} aria-labelledby="rectify">
              <h3 id="rectify">Right to Rectification</h3>
              <p>
                If your personal data is inaccurate or incomplete, you can ask
                us to correct it.
              </p>
            </article>

            <article className={classes.card} aria-labelledby="erase">
              <h3 id="erase">Right to Erasure</h3>
              <p>
                You can request deletion of your personal data (subject to legal
                exceptions).
              </p>
            </article>

            <article className={classes.card} aria-labelledby="portability">
              <h3 id="portability">Data Portability</h3>
              <p>
                Receive your personal data in a structured, commonly used format
                for transfer.
              </p>
            </article>

            <article className={classes.card} aria-labelledby="object">
              <h3 id="object">Right to Object</h3>
              <p>
                You may object to processing in certain circumstances (e.g.
                direct marketing).
              </p>
            </article>
          </div>
        </section>

        <section
          className={classes.section}
          aria-labelledby="sharing-heading"
          role="region"
        >
          <h2 id="sharing-heading" className={classes.sectionTitle}>
            Data Sharing & International Transfers
          </h2>
          <p className={classes.text}>
            We may share data with our partners for the purposes described in
            our Privacy Policy (e.g. Spotify, Apple Health, wearables). Where
            transfers outside the European Economic Area occur, we rely on
            appropriate safeguards such as Standard Contractual Clauses (SCCs).
          </p>
          <p className={classes.text}>
            For details on transfers and partner lists, contact our Data
            Protection Officer below.
          </p>
        </section>

        <section
          className={classes.section}
          aria-labelledby="dpo-heading"
          role="region"
        >
          <h2 id="dpo-heading" className={classes.sectionTitle}>
            Data Protection Officer (DPO)
          </h2>
          <div className={classes.dpo}>
            <div>
              <p>
                <strong>{DPO.name}</strong>
              </p>
              <p>
                Email:{" "}
                <a className={classes.link} href={`mailto:${DPO.email}`}>
                  {DPO.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a className={classes.link} href={`tel:${DPO.phone}`}>
                  {DPO.phone}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section
          className={classes.section}
          aria-labelledby="request-heading"
          role="region"
        >
          <h2 id="request-heading" className={classes.sectionTitle}>
            Submit a GDPR Request
          </h2>

          <form
            className={classes.form}
            onSubmit={submitRequest}
            aria-describedby="request-desc"
          >
            <p id="request-desc" className={classes.text}>
              Use the form below to request access, rectification, erasure,
              portability or to object to processing. We will respond within 30
              days in most cases.
            </p>

            <label className={classes.label}>
              Your name
              <input
                className={classes.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className={classes.label}>
              Email address
              <input
                className={classes.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className={classes.label}>
              Request type
              <select
                className={classes.input}
                value={requestType}
                onChange={(e) => setRequestType(e.target.value as any)}
              >
                <option value="access">Access (copy of data)</option>
                <option value="rectify">Rectification (correct data)</option>
                <option value="delete">Erasure (delete my data)</option>
                <option value="portability">Portability (export)</option>
                <option value="object">Object / Restrict processing</option>
              </select>
            </label>

            <label className={classes.label}>
              Optional message
              <textarea
                className={classes.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </label>

            <div className={classes.actions}>
              <button type="submit" className={classes.primary}>
                Submit Request
              </button>

              <button
                type="button"
                className={classes.secondary}
                onClick={() => {
                  setName("");
                  setEmail("");
                  setMessage("");
                  setRequestType("access");
                  setStatus(null);
                }}
              >
                Reset
              </button>
            </div>

            <div aria-live="polite" className={classes.feedback}>
              {status && (
                <div
                  className={
                    status.type === "success"
                      ? classes.successBox
                      : classes.errorBox
                  }
                >
                  {status.text}
                </div>
              )}
            </div>
          </form>
        </section>

        <footer className={classes.footer}>
          <p className={classes.muted}>
            If you cannot access the form, email your GDPR request to{" "}
            <a className={classes.link} href={`mailto:${DPO.email}`}>
              {DPO.email}
            </a>
            .
          </p>
          <p className={classes.small}>
            DVeb Motion™ committed to privacy and transparency.
          </p>
        </footer>
      </main>
    </>
  );
}
