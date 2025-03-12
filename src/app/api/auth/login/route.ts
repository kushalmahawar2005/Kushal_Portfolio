import { NextRequest } from 'next/server';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // TODO: Replace with actual authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      // In a real app, you would generate a proper JWT token here
      const token = 'dummy-token';
      return successResponse({ token }, 'Login successful');
    }

    return errorResponse('Invalid credentials', 401);
  } catch (error) {
    return errorResponse('An error occurred during login');
  }
} 