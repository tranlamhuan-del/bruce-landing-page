import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthFromCookie } from '@/lib/auth-hwl';
import { logJob } from '@/lib/sheets-hwl';

const SCRAPER_URL = process.env.HWL_SCRAPER_URL || 'http://localhost:3002';
const SCRAPER_SECRET = process.env.HWL_SCRAPER_SECRET || 'dev-secret';

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const user = await getAuthFromCookie();
    if (!user) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const { containerType, pol, pod } = await req.json();

    if (!containerType || !pol || !pod) {
      return NextResponse.json({ error: 'Thiếu thông tin: containerType, pol, pod' }, { status: 400 });
    }

    // Call Railway scraper
    const scraperRes = await fetch(`${SCRAPER_URL}/api/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SCRAPER_SECRET}`,
      },
      body: JSON.stringify({ containerType, pol, pod }),
    });

    const scraperData = await scraperRes.json();

    if (!scraperRes.ok || !scraperData.success) {
      // Log failed job
      await logJob({
        username: user.username,
        timestamp: new Date().toISOString(),
        containerType,
        pol,
        pod,
        carrier: 'HLAG',
        status: 'error',
        resultSummary: scraperData.error || 'Scraper error',
      }).catch(() => {}); // Don't fail if logging fails

      return NextResponse.json(
        { error: scraperData.error || 'Lỗi tra giá từ Hapag-Lloyd' },
        { status: 502 }
      );
    }

    // Log successful job
    const rate = scraperData.rate;
    await logJob({
      username: user.username,
      timestamp: new Date().toISOString(),
      containerType,
      pol,
      pod,
      carrier: 'HLAG',
      status: 'success',
      resultSummary: `O/F: ${rate.currency} ${rate.oceanFreight} | Total: ${rate.currency} ${rate.totalAmount}`,
    }).catch(() => {});

    return NextResponse.json({ success: true, rate });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('HWL rates lookup error:', msg);
    return NextResponse.json({ error: `Lỗi hệ thống: ${msg}` }, { status: 500 });
  }
}
