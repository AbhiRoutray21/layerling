import { NextResponse } from "next/server";
import { serverDefaultsFromEnvironment } from "@/lib/serverDefaults";

/**
 * What this server suggests to people who have not chosen yet; see `LAYERLING_DEFAULT_THEME` in the
 * README. No `revalidate` and no `dynamic` here on purpose: a GET handler runs on every request, so
 * the answer is the environment of the running server, not the one the image was built in, and a
 * static export (which cannot take `force-dynamic`) still builds it once and never asks.
 */
export function GET() {
  return NextResponse.json(serverDefaultsFromEnvironment(process.env), { headers: { "Cache-Control": "no-store" } });
}
