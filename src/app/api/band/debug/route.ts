import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    BAND_SHEET_ID: process.env.BAND_SHEET_ID ? 'SET' : 'MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'SET' : 'MISSING',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'MISSING',
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN ? 'SET' : 'MISSING',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV,
  });
}
