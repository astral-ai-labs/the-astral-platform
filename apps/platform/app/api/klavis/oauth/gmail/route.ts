import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

const KLAVIS_CALLBACK = "https://api.klavis.ai/oauth/gmail/callback";
const DONE_URL = "http://localhost:3001/integrations"; // or /integrations/gmail/done

export async function GET(req: NextRequest) {
  // Grab all params from the Google redirect
  const incomingUrl = new URL(req.url);

  // Start with the real Klavis callback
  const klavisUrl = new URL(KLAVIS_CALLBACK);

  // Copy every param from incoming except redirect_url (so we don't double up)
  incomingUrl.searchParams.forEach((value, key) => {
    console.log("key:value", key, value);
    klavisUrl.searchParams.set(key, value);
  });

  // Now add/overwrite redirect_url so user lands on your UI after Klavis
  klavisUrl.searchParams.set("redirect_url", DONE_URL);

  console.log("klavisUrl", klavisUrl.toString());

  // This ensures code, state, etc. ALL get forwarded!
  // return NextResponse.redirect(klavisUrl.toString(), 302);

  redirect(DONE_URL);
}