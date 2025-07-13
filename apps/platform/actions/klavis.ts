"use server";

import { redirect } from "next/navigation";
import { KlavisClient, Klavis } from "klavis";

const KLAVIS_API_KEY = "VEGleCGntUUINS8rHl1hI1BXWjtqkt1bRl8LZaTI/Kk=";

const klavis = new KlavisClient({ apiKey: KLAVIS_API_KEY });

export async function startGmailOAuth(userId: string) {
  // 1. spin up an MCP server instance for this user
  const { instanceId } = await klavis.mcpServer.createServerInstance({
    serverName: Klavis.McpServerName.Gmail,
    userId,
    platformName: "MyApp",
  }); // → instanceId & (generic) oauthUrl  [oai_citation:0‡Klavis AI](https://docs.klavis.ai/documentation/mcp-server/github?utm_source=chatgpt.com)

  // 2. build a branded authorize URL that includes the *redirect_url* param
  const authorize = new URL("https://api.klavis.ai/oauth/gmail/authorize");
  authorize.searchParams.set("instance_id", instanceId);
  authorize.searchParams.set("redirect_url", `http://localhost:3001/api/klavis/oauth/gmail`); // redirect_url is an officially-supported query param  [oai_citation:1‡Klavis AI](https://docs.klavis.ai/api-reference/linear-oauth/authorize-linear)
  authorize.searchParams.set("client_id", "606865281387-4bnvptlk488t0ko2b2to1r728ibv3fkg.apps.googleusercontent.com");


  console.log("instanceId", instanceId);
  console.log("authorize", authorize.toString());

  return authorize.toString(); // hand this back to the client
}
