import { mkdir, appendFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
  } | null;

  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (process.env.SUBSCRIBE_WEBHOOK_URL) {
    const response = await fetch(process.env.SUBSCRIBE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "lifeforgetrading.com",
        subscribedAt: new Date().toISOString()
      })
    }).catch(() => null);

    if (!response?.ok) {
      return NextResponse.json(
        { message: "The list is unavailable right now. Try again soon." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: "You're on the list. Thanks for joining."
    });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Email capture is not configured yet." },
      { status: 503 }
    );
  }

  const filePath = join(process.cwd(), "data", "subscribers.csv");
  await mkdir(dirname(filePath), { recursive: true });
  await appendFile(filePath, `${new Date().toISOString()},${email}\n`, "utf8");

  return NextResponse.json({
    message: "You're on the list. Thanks for joining."
  });
}
