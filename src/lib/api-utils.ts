import { NextResponse } from 'next/server';

export function successResponse(data: any, message: string = 'Success') {
  return NextResponse.json(
    { success: true, message, data },
    { status: 200 }
  );
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

export function notFoundResponse(message: string = 'Not found') {
  return NextResponse.json(
    { success: false, message },
    { status: 404 }
  );
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { success: false, message },
    { status: 401 }
  );
} 