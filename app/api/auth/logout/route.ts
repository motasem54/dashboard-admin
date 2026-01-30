import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { createLog } from '@/lib/logger';

export async function POST(request: NextRequest) {
  const user = getUserFromRequest(request);

  if (user) {
    await createLog({
      userId: user.id,
      action: 'LOGOUT',
      description: 'User logged out',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('auth-token');
  return response;
}
