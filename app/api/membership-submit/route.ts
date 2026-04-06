import { NextResponse } from "next/server";

const FORM_ID = "1FAIpQLSe9Mvd_nXAd6tiQIzznKIoJANUyoZ19_6_anUKOeRzOTTvJ_Q";
const VIEW_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
const SUBMIT_FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

interface MembershipPayload {
  email?: string;
  fullName?: string;
  address?: string;
  telephone?: string;
  declarationConsent?: boolean;
  contributionMethod?: string;
  signature?: boolean;
  dateSigned?: string;
}

function isValidPayload(payload: MembershipPayload) {
  return (
    !!payload.email &&
    !!payload.fullName &&
    !!payload.address &&
    !!payload.telephone &&
    !!payload.contributionMethod &&
    !!payload.dateSigned &&
    payload.declarationConsent === true &&
    payload.signature === true
  );
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as MembershipPayload;

    if (!isValidPayload(payload)) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const [year, month, day] = payload.dateSigned!.split("-");
    if (!year || !month || !day) {
      return NextResponse.json(
        { error: "Please provide a valid signing date." },
        { status: 400 }
      );
    }

    // Google Forms requires a fresh fbzx token from the current viewform page.
    const tokenRes = await fetch(VIEW_FORM_URL, {
      headers: { "User-Agent": "Mozilla/5.0" },
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      return NextResponse.json(
        { error: "Unable to reach the membership form service." },
        { status: 502 }
      );
    }

    const html = await tokenRes.text();
    const fbzxMatch = html.match(/name="fbzx" value="([^"]+)"/);
    const partialResponseMatch = html.match(/name="partialResponse" value="([^"]+)"/);
    const fbzx = fbzxMatch?.[1];
    const partialResponse = partialResponseMatch?.[1];

    if (!fbzx || fbzx === "-1" || !partialResponse) {
      return NextResponse.json(
        { error: "Unable to start a valid membership submission." },
        { status: 502 }
      );
    }

    const params = new URLSearchParams();
    params.append("emailAddress", payload.email!);
    params.append("entry.767132503", payload.fullName!);
    params.append("entry.1786010228", payload.address!);
    params.append("entry.717509507", payload.telephone!);
    params.append("entry.670318372", "I agree");
    params.append("entry.670318372_sentinel", "");
    params.append("entry.838236798", payload.contributionMethod!);
    params.append("entry.838236798_sentinel", "");
    // Google Form section-2 question IDs can change after editing/duplication.
    // Submit both known ID sets so signature/date continue to land reliably.
    params.append("entry.1982581320", "Signed");
    params.append("entry.1982581320_sentinel", "");
    params.append("entry.472285251_year", year);
    params.append("entry.472285251_month", month);
    params.append("entry.472285251_day", day);
    params.append("entry.1625851121", "Signed");
    params.append("entry.1625851121_sentinel", "");
    params.append("entry.761087562_year", year);
    params.append("entry.761087562_month", month);
    params.append("entry.761087562_day", day);
    params.append("fvv", "1");
    params.append("partialResponse", partialResponse);
    params.append("pageHistory", "0,1");
    params.append("fbzx", fbzx);
    params.append("submissionTimestamp", "-1");

    const submitRes = await fetch(SUBMIT_FORM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "User-Agent": "Mozilla/5.0",
      },
      body: params.toString(),
      redirect: "manual",
      cache: "no-store",
    });

    if (!submitRes.ok && submitRes.status !== 302) {
      return NextResponse.json(
        { error: "Google Forms did not accept the submission." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
