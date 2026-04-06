import { NextResponse } from "next/server";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe9Mvd_nXAd6tiQIzznKIoJANUyoZ19_6_anUKOeRzOTTvJ_Q/viewform";

export async function GET() {
  try {
    const res = await fetch(FORM_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await res.text();

    const match = html.match(/name="fbzx" value="([^"]+)"/);
    const fbzx = match ? match[1] : "-1";

    return NextResponse.json({ fbzx });
  } catch {
    return NextResponse.json({ fbzx: "-1" });
  }
}
