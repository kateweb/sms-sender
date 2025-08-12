import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0] || // Get IP from proxy header
        req.headers.get('x-real-ip') || // Another proxy header fallback
        'Unknown IP';

    return NextResponse.json({ ip });
}