import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {login} = await request.json();
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/password-recovery/request`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login })
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: true,
          status: response.status,
          message: data.message || 'Validation failed',
          errors: data.errors || null,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Password recovery request error:', error);
    return NextResponse.json(
      {
        error: true,
        message: error.message || 'Unexpected server error',
      },
      { status: 500 }
    );
  }
}
