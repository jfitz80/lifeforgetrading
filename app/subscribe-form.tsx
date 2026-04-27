export function SubscribeForm() {
  return (
    <form
      className="subscribe-form"
      action="https://app.kit.com/forms/9376932/subscriptions"
      method="post"
      acceptCharset="UTF-8"
    >
      <label htmlFor="email">Get the free checklist</label>
      <div className="form-row">
        <input
          id="email"
          name="email_address"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit">Get Checklist</button>
      </div>
      <p className="form-message">
        No spam. Just the checklist and practical trading notes.
      </p>
    </form>
  );
}
