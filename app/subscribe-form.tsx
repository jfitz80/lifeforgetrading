"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const body = (await response.json()) as { message?: string };

    if (!response.ok) {
      setState("error");
      setMessage(body.message ?? "Something went wrong. Try again.");
      return;
    }

    setState("success");
    setEmail("");
    setMessage(body.message ?? "You're on the list.");
  }

  return (
    <form className="subscribe-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Get the free checklist</label>
      <div className="form-row">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Sending" : "Get Checklist"}
        </button>
      </div>
      <p className={`form-message ${state === "error" ? "error" : ""}`}>
        {message || "No spam. Just the checklist and practical trading notes."}
      </p>
    </form>
  );
}
