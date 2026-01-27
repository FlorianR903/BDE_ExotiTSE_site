import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch('https://api.exotitse.fr/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    console.error("Error proxing order:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
