import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.ENGINE_BACKEND_URL ?? "http://localhost:8000";

async function proxyRequest(req: NextRequest, path: string[]) {
  const pathStr = path.join("/");
  const url = new URL(`${BACKEND}/${pathStr}`);
  req.nextUrl.searchParams.forEach((v, k) => url.searchParams.append(k, v));

  const isPost = req.method === "POST";
  const init: RequestInit = {
    method: req.method,
    ...(isPost && {
      body: await req.text(),
      headers: { "Content-Type": "application/json" },
    }),
  };

  try {
    const res = await fetch(url.toString(), init);
    const contentType = res.headers.get("Content-Type") ?? "application/json";
    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      status: res.status,
      headers: { "Content-Type": contentType },
    });
  } catch {
    return NextResponse.json({ error: "Engine backend unreachable" }, { status: 503 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}
